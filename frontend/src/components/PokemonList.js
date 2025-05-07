import React from 'react';

const PokemonList = ({ pokemons, count, limit, offset, onPageChange, loading }) => {
  const totalPages = Math.ceil(count / limit);
  const currentPage = Math.floor(offset / limit) + 1;

  return (
    <div>
      {loading && <p>Cargando...</p>}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {pokemons.map((p) => (
          <li key={p.name} style={{ margin: '8px 0', borderBottom: '1px solid #eee' }}>
            {p.name.charAt(0).toUpperCase() + p.name.slice(1)}
          </li>
        ))}
      </ul>
      <div style={{ marginTop: 16, display: 'flex', justifyContent: 'center', gap: 8 }}>
        <button onClick={() => onPageChange(offset - limit)} disabled={offset === 0}>
          Anterior
        </button>
        <span>Página {currentPage} de {totalPages}</span>
        <button onClick={() => onPageChange(offset + limit)} disabled={offset + limit >= count}>
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default PokemonList; 