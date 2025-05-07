import React, { useState, useEffect } from 'react';

const SearchBar = ({ value, onSearch }) => {
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleButtonClick = (e) => {
    e.preventDefault();
    onSearch(inputValue);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onSearch(inputValue);
    }
  };

  return (
    <form
      className="pokedex-searchbar"
      onSubmit={handleButtonClick}
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
      }}
    >
      <input
        type="text"
        placeholder="Buscar Pokémon..."
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        style={{
          padding: '8px',
          width: '70%',
          maxWidth: 320,
          marginRight: 8,
          borderRadius: 6,
          border: '1px solid #bbb',
          fontSize: 16,
        }}
      />
      <button type="submit" className="pokedex-btn-search">
        Buscar
      </button>
    </form>
  );
};

export default SearchBar; 