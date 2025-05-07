package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"strings"
	"sync"
	"time"
)

type PokemonListResponse struct {
	Count    int           `json:"count"`
	Next     string        `json:"next"`
	Previous string        `json:"previous"`
	Results  []PokemonItem `json:"results"`
}

type PokemonItem struct {
	Name string `json:"name"`
	Url  string `json:"url"`
}

type CacheItem struct {
	Data      PokemonListResponse
	ExpiresAt time.Time
}

var (
	cache      = make(map[string]CacheItem)
	cacheMutex sync.Mutex
	cacheTTL   = 2 * time.Minute
)

func getFromCache(key string) (PokemonListResponse, bool) {
	cacheMutex.Lock()
	defer cacheMutex.Unlock()
	item, found := cache[key]
	if !found || time.Now().After(item.ExpiresAt) {
		return PokemonListResponse{}, false
	}
	return item.Data, true
}

func setCache(key string, data PokemonListResponse) {
	cacheMutex.Lock()
	defer cacheMutex.Unlock()
	cache[key] = CacheItem{
		Data:      data,
		ExpiresAt: time.Now().Add(cacheTTL),
	}
}

func fetchPokemonList(limit, offset int) (PokemonListResponse, error) {
	url := fmt.Sprintf("https://pokeapi.co/api/v2/pokemon?limit=%d&offset=%d", limit, offset)
	resp, err := http.Get(url)
	if err != nil {
		return PokemonListResponse{}, err
	}
	defer resp.Body.Close()
	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return PokemonListResponse{}, err
	}
	var data PokemonListResponse
	err = json.Unmarshal(body, &data)
	if err != nil {
		return PokemonListResponse{}, err
	}
	return data, nil
}

func pokemonHandler(w http.ResponseWriter, r *http.Request) {
	// Permitir CORS
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	// Manejar preflight (OPTIONS)
	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}

	search := r.URL.Query().Get("search")
	limit := 20
	offset := 0
	fmt.Sscanf(r.URL.Query().Get("limit"), "%d", &limit)
	fmt.Sscanf(r.URL.Query().Get("offset"), "%d", &offset)

	cacheKey := fmt.Sprintf("%s-%d-%d", search, limit, offset)
	if data, found := getFromCache(cacheKey); found {
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(data)
		return
	}

	data, err := fetchPokemonList(1000, 0) // fetch a large list for search
	if err != nil {
		http.Error(w, "Error fetching data", http.StatusInternalServerError)
		return
	}

	filtered := []PokemonItem{}
	for _, p := range data.Results {
		if search == "" || strings.Contains(strings.ToLower(p.Name), strings.ToLower(search)) {
			filtered = append(filtered, p)
		}
	}

	// Paginate
	start := offset
	end := offset + limit
	if start > len(filtered) {
		start = len(filtered)
	}
	if end > len(filtered) {
		end = len(filtered)
	}
	paginated := filtered[start:end]

	result := PokemonListResponse{
		Count:    len(filtered),
		Next:     "",
		Previous: "",
		Results:  paginated,
	}

	setCache(cacheKey, result)
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(result)
}

func main() {
	http.HandleFunc("/api/pokemon", pokemonHandler)
	fmt.Println("Servidor iniciado en http://localhost:8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
