package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
)

func FetchPokemonDetail(name string) (PokemonDetail, error) {
	url := fmt.Sprintf("https://pokeapi.co/api/v2/pokemon/%s", name)
	resp, err := http.Get(url)
	if err != nil {
		return PokemonDetail{}, err
	}
	defer resp.Body.Close()
	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return PokemonDetail{}, err
	}
	var data PokemonDetail
	err = json.Unmarshal(body, &data)
	if err != nil {
		return PokemonDetail{}, err
	}
	return data, nil
}
