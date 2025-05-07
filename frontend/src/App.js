import React, { useState, useCallback, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import PokemonList from './components/PokemonList';
import { fetchPokemons } from './utils/api';

function App() {
  const [search, setSearch] = useState('');
  const [pokemons, setPokemons] = useState([]);
  const [count, setCount] = useState(0);
  const [limit] = useState(20);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);

  const loadPokemons = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchPokemons({ search, limit, offset });
      setPokemons(data.results);
      setCount(data.count);
    } catch (e) {
      setPokemons([]);
      setCount(0);
    }
    setLoading(false);
  }, [search, limit, offset]);

  useEffect(() => {
    loadPokemons();
  }, [loadPokemons]);

  const handleSearch = (value) => {
    setSearch(value);
    setOffset(0);
  };

  const handlePageChange = (newOffset) => {
    setOffset(Math.max(0, newOffset));
  };

  return (
    <div style={{ maxWidth: 400, margin: '40px auto', padding: 16, background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px #eee' }}>
      <h2>Pokédex</h2>
      <SearchBar onSearch={handleSearch} />
      <PokemonList
        pokemons={pokemons}
        count={count}
        limit={limit}
        offset={offset}
        onPageChange={handlePageChange}
        loading={loading}
      />
    </div>
  );
}

export default App;
