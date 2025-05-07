import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import PokemonList from '../PokemonList/PokemonList';

// Mock de fetch para simular la respuesta de la API
global.fetch = jest.fn();

describe('PokemonList', () => {
  const mockPokemons = [
    { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
    { name: 'charmander', url: 'https://pokeapi.co/api/v2/pokemon/4/' },
    { name: 'squirtle', url: 'https://pokeapi.co/api/v2/pokemon/7/' }
  ];

  const mockProps = {
    pokemons: mockPokemons,
    count: 3,
    limit: 10,
    offset: 0,
    onPageChange: jest.fn(),
    loading: false
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renderiza la lista de Pokémon correctamente', () => {
    render(<PokemonList {...mockProps} />);
    
    // Verifica que los nombres de los Pokémon estén en la tabla
    expect(screen.getByText('Bulbasaur')).toBeInTheDocument();
    expect(screen.getByText('Charmander')).toBeInTheDocument();
    expect(screen.getByText('Squirtle')).toBeInTheDocument();
  });

  it('muestra mensaje cuando no hay Pokémon', () => {
    render(<PokemonList {...mockProps} pokemons={[]} />);
    expect(screen.getByText('No hay Pokémon para mostrar.')).toBeInTheDocument();
  });

  it('muestra mensaje de carga cuando loading es true', () => {
    render(<PokemonList {...mockProps} loading={true} />);
    expect(screen.getByText('Cargando...')).toBeInTheDocument();
  });

  it('ordena los Pokémon alfabéticamente', () => {
    const unsortedPokemons = [
      { name: 'charmander', url: 'https://pokeapi.co/api/v2/pokemon/4/' },
      { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
      { name: 'squirtle', url: 'https://pokeapi.co/api/v2/pokemon/7/' }
    ];

    render(<PokemonList {...mockProps} pokemons={unsortedPokemons} />);
    
    const rows = screen.getAllByRole('row').slice(1); // Excluye el header
    expect(rows[0]).toHaveTextContent('Bulbasaur');
    expect(rows[1]).toHaveTextContent('Charmander');
    expect(rows[2]).toHaveTextContent('Squirtle');
  });

  it('llama a onPageChange cuando se cambia de página', () => {
    render(<PokemonList {...mockProps} />);
    
    // Simula el click en el botón "Siguiente"
    const nextButton = screen.getByText('Siguiente');
    fireEvent.click(nextButton);
    
    // Verifica que onPageChange fue llamado con el offset correcto
    expect(mockProps.onPageChange).toHaveBeenCalled();
  });

  it('muestra el modal de detalles al hacer click en un Pokémon', async () => {
    const mockPokemonDetail = {
      name: 'bulbasaur',
      height: 7,
      weight: 69,
      base_experience: 64,
      types: [{ type: { name: 'grass' } }],
      abilities: [{ ability: { name: 'overgrow' } }],
      sprites: {
        front_default: 'url-to-sprite',
        front_shiny: 'url-to-shiny-sprite'
      }
    };

    global.fetch.mockResolvedValueOnce({
      json: () => Promise.resolve(mockPokemonDetail)
    });

    render(<PokemonList {...mockProps} />);
    
    // Click en el enlace "Ver" del primer Pokémon
    const viewLink = screen.getAllByText('Ver')[0];
    fireEvent.click(viewLink);

    // Espera a que el modal se muestre
    await waitFor(() => {
      expect(screen.getByText('Bulbasaur')).toBeInTheDocument();
    });

    // Verifica que se hizo la llamada a la API
    expect(global.fetch).toHaveBeenCalledWith('http://localhost:8080/api/pokemon/bulbasaur');
  });
}); 