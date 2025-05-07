package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"sort"
	"strings"
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

var (
	pokemonListCache   = NewCache(2 * time.Minute)
	pokemonDetailCache = NewCache(5 * time.Minute)
)

func pokemonHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
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
	if data, found := pokemonListCache.Get(cacheKey); found {
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(data)
		return
	}

	data, err := FetchAllPokemon()
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

	sort.Slice(filtered, func(i, j int) bool {
		return filtered[i].Name < filtered[j].Name
	})

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

	pokemonListCache.Set(cacheKey, result)
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(result)
}

func pokemonDetailHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}

	name := strings.TrimPrefix(r.URL.Path, "/api/pokemon/")
	if name == "" {
		http.Error(w, "Missing pokemon name", http.StatusBadRequest)
		return
	}

	if data, found := pokemonDetailCache.Get(name); found {
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(data)
		return
	}

	detail, err := FetchPokemonDetail(name)
	if err != nil {
		http.Error(w, "Error fetching detail", http.StatusInternalServerError)
		return
	}
	pokemonDetailCache.Set(name, detail)
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(detail)
}

func main() {
	http.HandleFunc("/api/pokemon", pokemonHandler)
	http.HandleFunc("/api/pokemon/", pokemonDetailHandler)
	fmt.Println("Servidor iniciado en http://localhost:8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
