package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
)

func FetchAllPokemon() (PokemonListResponse, error) {
	// Primer request para obtener el total
	url := "https://pokeapi.co/api/v2/pokemon?limit=1"
	resp, err := http.Get(url)
	if err != nil {
		return PokemonListResponse{}, err
	}
	defer resp.Body.Close()
	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return PokemonListResponse{}, err
	}
	var temp PokemonListResponse
	err = json.Unmarshal(body, &temp)
	if err != nil {
		return PokemonListResponse{}, err
	}
	// Segundo request para traer todos
	url = fmt.Sprintf("https://pokeapi.co/api/v2/pokemon?limit=%d", temp.Count)
	resp, err = http.Get(url)
	if err != nil {
		return PokemonListResponse{}, err
	}
	defer resp.Body.Close()
	body, err = ioutil.ReadAll(resp.Body)
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
