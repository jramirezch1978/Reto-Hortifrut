import React, { useState, useEffect } from 'react';

const SearchBar = ({ onSearch }) => {
  const [value, setValue] = useState('');

  useEffect(() => {
    const handler = setTimeout(() => {
      onSearch(value);
    }, 500); // 500ms debounce
    return () => clearTimeout(handler);
  }, [value, onSearch]);

  return (
    <input
      type="text"
      placeholder="Buscar Pokémon..."
      value={value}
      onChange={e => setValue(e.target.value)}
      style={{ padding: '8px', width: '100%', marginBottom: '16px' }}
    />
  );
};

export default SearchBar; 