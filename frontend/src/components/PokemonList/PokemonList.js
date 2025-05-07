import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import PokemonDetailModal from '../PokemonDetailModal/PokemonDetailModal';
import './PokemonList.css';

const PokemonList = ({ pokemons, count, limit, offset, onPageChange, loading }) => {
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const totalPages = Math.ceil(count / limit);
  const currentPage = Math.floor(offset / limit);

  // Ordenar alfabéticamente por nombre
  const sortedPokemons = [...pokemons].sort((a, b) => a.name.localeCompare(b.name));

  const handlePageClick = (data) => {
    const selected = data.selected;
    onPageChange(selected * limit);
  };

  const handlePokemonClick = async (e, pokemonName) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/api/pokemon/${pokemonName}`);
      const data = await response.json();
      setSelectedPokemon(data);
    } catch (error) {
      console.error('Error fetching Pokemon details:', error);
    }
  };

  return (
    <div className="pokedex-container">
      {loading && <p className="pokedex-loading">Cargando...</p>}
      {!loading && sortedPokemons.length === 0 && <p className="pokedex-empty">No hay Pokémon para mostrar.</p>}
      {!loading && sortedPokemons.length > 0 && (
        <table className="pokedex-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>URL</th>
            </tr>
          </thead>
          <tbody>
            {sortedPokemons.map((p, idx) => (
              <tr key={p.name}>
                <td>{offset + idx + 1}</td>
                <td className="pokedex-name">{p.name.charAt(0).toUpperCase() + p.name.slice(1)}</td>
                <td>
                  <a 
                    href="#" 
                    onClick={(e) => handlePokemonClick(e, p.name)} 
                    className="pokedex-link"
                  >
                    Ver
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      
      <ReactPaginate
        previousLabel={"Anterior"}
        nextLabel={"Siguiente"}
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount={totalPages}
        marginPagesDisplayed={1}
        pageRangeDisplayed={2}
        onPageChange={handlePageClick}
        forcePage={currentPage}
        containerClassName={"pokedex-pagination"}
        activeClassName={"active"}
        pageClassName={"pokedex-page"}
        previousClassName={"pokedex-prev"}
        nextClassName={"pokedex-next"}
        disabledClassName={"pokedex-disabled"}
      />
      <span className="pokedex-page-info">Página {currentPage + 1} de {totalPages}</span>

      {selectedPokemon && (
        <PokemonDetailModal
          pokemon={selectedPokemon}
          onClose={() => setSelectedPokemon(null)}
        />
      )}
    </div>
  );
};

export default PokemonList; 