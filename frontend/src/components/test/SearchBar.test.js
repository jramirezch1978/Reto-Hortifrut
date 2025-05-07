import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from '../SearchBar/SearchBar';

describe('SearchBar', () => {
  it('renderiza el input y el botón', () => {
    render(<SearchBar value="" onSearch={() => {}} />);
    expect(screen.getByPlaceholderText(/Buscar Pokémon/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Buscar/i })).toBeInTheDocument();
  });

  it('llama a onSearch al hacer click en el botón', () => {
    const onSearchMock = jest.fn();
    render(<SearchBar value="" onSearch={onSearchMock} />);
    fireEvent.change(screen.getByPlaceholderText(/Buscar Pokémon/i), { target: { value: 'pikachu' } });
    fireEvent.click(screen.getByRole('button', { name: /Buscar/i }));
    expect(onSearchMock).toHaveBeenCalledWith('pikachu');
  });

  it('llama a onSearch al presionar Enter', () => {
    const onSearchMock = jest.fn();
    render(<SearchBar value="" onSearch={onSearchMock} />);
    const input = screen.getByPlaceholderText(/Buscar Pokémon/i);
    fireEvent.change(input, { target: { value: 'bulbasaur' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
    expect(onSearchMock).toHaveBeenCalledWith('bulbasaur');
  });
}); 