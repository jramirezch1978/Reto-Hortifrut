import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PokemonDetailModal from '../PokemonDetailModal/PokemonDetailModal';

describe('PokemonDetailModal', () => {
  const mockPokemon = {
    name: 'bulbasaur',
    height: 7,
    weight: 69,
    base_experience: 64,
    types: [
      { type: { name: 'grass' } },
      { type: { name: 'poison' } }
    ],
    abilities: [
      { ability: { name: 'overgrow' } },
      { ability: { name: 'chlorophyll', is_hidden: true } }
    ],
    sprites: {
      front_default: 'url-to-sprite',
      front_shiny: 'url-to-shiny-sprite',
      other: {
        'official-artwork': {
          front_default: 'url-to-official-art'
        }
      }
    },
    moves: [
      { move: { name: 'tackle' } },
      { move: { name: 'vine-whip' } }
    ],
    cries: {
      latest: 'url-to-latest-cry',
      legacy: 'url-to-legacy-cry'
    }
  };

  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('no renderiza nada cuando no hay Pokémon seleccionado', () => {
    render(<PokemonDetailModal pokemon={null} onClose={mockOnClose} />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renderiza el modal con la información básica del Pokémon', () => {
    render(<PokemonDetailModal pokemon={mockPokemon} onClose={mockOnClose} />);
    
    // Verifica el título
    expect(screen.getByText('Bulbasaur')).toBeInTheDocument();
    
    // Verifica las estadísticas básicas
    expect(screen.getByText('Altura:')).toBeInTheDocument();
    expect(screen.getByText('0.7m')).toBeInTheDocument();
    expect(screen.getByText('Peso:')).toBeInTheDocument();
    expect(screen.getByText('6.9kg')).toBeInTheDocument();
    expect(screen.getByText('Experiencia base:')).toBeInTheDocument();
    expect(screen.getByText('64')).toBeInTheDocument();
  });

  it('muestra los tipos del Pokémon', () => {
    render(<PokemonDetailModal pokemon={mockPokemon} onClose={mockOnClose} />);
    
    expect(screen.getByText('grass')).toBeInTheDocument();
    expect(screen.getByText('poison')).toBeInTheDocument();
  });

  it('muestra las habilidades del Pokémon', () => {
    render(<PokemonDetailModal pokemon={mockPokemon} onClose={mockOnClose} />);
    
    // Verifica que las habilidades están presentes
    expect(screen.getByText('overgrow')).toBeInTheDocument();
    expect(screen.getByText('chlorophyll')).toBeInTheDocument();
    
    // Verifica que la habilidad oculta está marcada
    const hiddenAbility = screen.getByText('chlorophyll').closest('.ability');
    expect(hiddenAbility).toHaveTextContent('Oculta');
  });

  it('cambia entre pestañas correctamente', () => {
    render(<PokemonDetailModal pokemon={mockPokemon} onClose={mockOnClose} />);
    
    // Verifica que la pestaña de información está activa por defecto
    expect(screen.getByText('Información')).toHaveClass('active');
    
    // Cambia a la pestaña de sprites
    fireEvent.click(screen.getByText('Sprites'));
    expect(screen.getByText('Sprites')).toHaveClass('active');
    
    // Cambia a la pestaña de movimientos
    fireEvent.click(screen.getByText('Movimientos'));
    expect(screen.getByText('Movimientos')).toHaveClass('active');
    
    // Cambia a la pestaña de sonidos
    fireEvent.click(screen.getByText('Sonidos'));
    expect(screen.getByText('Sonidos')).toHaveClass('active');
  });

  it('cierra el modal al hacer click en el botón de cerrar', () => {
    render(<PokemonDetailModal pokemon={mockPokemon} onClose={mockOnClose} />);
    
    const closeButton = screen.getByText('×');
    fireEvent.click(closeButton);
    
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('cierra el modal al hacer click fuera del contenido', () => {
    render(<PokemonDetailModal pokemon={mockPokemon} onClose={mockOnClose} />);
    
    const overlay = screen.getByRole('dialog');
    fireEvent.click(overlay);
    
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('no cierra el modal al hacer click dentro del contenido', () => {
    render(<PokemonDetailModal pokemon={mockPokemon} onClose={mockOnClose} />);
    
    const content = screen.getByRole('dialog').querySelector('.modal-content');
    fireEvent.click(content);
    
    expect(mockOnClose).not.toHaveBeenCalled();
  });
}); 