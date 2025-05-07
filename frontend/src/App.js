import React, { useState, useCallback, useEffect } from 'react';
import SearchBar from './components/SearchBar/SearchBar';
import PokemonList from './components/PokemonList/PokemonList';
import { fetchPokemons } from './utils/api';

function App() {
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [pokemons, setPokemons] = useState([]);
  const [count, setCount] = useState(0);
  const [limit] = useState(20);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 400); // 400ms debounce
    return () => clearTimeout(handler);
  }, [search]);

  const loadPokemons = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchPokemons({ search: debouncedSearch, limit, offset });
      setPokemons(data.results);
      setCount(data.count);
    } catch (e) {
      setPokemons([]);
      setCount(0);
    }
    setLoading(false);
  }, [debouncedSearch, limit, offset]);

  useEffect(() => {
    loadPokemons();
  }, [loadPokemons]);

  const handleSearch = (value) => {
    if (value !== search) {
      setSearch(value);
      setOffset(0);
    }
  };

  const handlePageChange = (newOffset) => {
    setOffset(Math.max(0, newOffset));
  };

  return (
    <div>
      <h2 style={{ textAlign: 'center', color: '#e63946', marginTop: 24, marginBottom: 0 }}>Pokédex</h2>
      <div className="pokedex-container">
        <SearchBar value={search} onSearch={handleSearch} />
        <PokemonList
          pokemons={pokemons}
          count={count}
          limit={limit}
          offset={offset}
          onPageChange={handlePageChange}
          loading={loading}
        />
      </div>
    </div>
  );
}

export default App;
