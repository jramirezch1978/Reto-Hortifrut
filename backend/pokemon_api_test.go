package main

import (
	"testing"
)

func TestFetchAllPokemon(t *testing.T) {
	data, err := FetchAllPokemon()
	if err != nil {
		t.Fatalf("Error al obtener todos los Pokémon: %v", err)
	}
	if data.Count == 0 || len(data.Results) == 0 {
		t.Error("La lista de Pokémon no debe estar vacía")
	}
}

func TestFetchPokemonDetail(t *testing.T) {
	pokemonName := "pikachu"
	data, err := FetchPokemonDetail(pokemonName)
	if err != nil {
		t.Fatalf("Error al obtener detalles de Pikachu: %v", err)
	}
	if data.Name != pokemonName {
		t.Errorf("Se esperaba el nombre %s, pero se obtuvo %s", pokemonName, data.Name)
	}
	if data.ID == 0 {
		t.Error("El ID de Pikachu no debe ser 0")
	}
}
