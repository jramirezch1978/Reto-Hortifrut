import React from 'react';
import ReactPaginate from 'react-paginate';
import './PokemonList.css';

const PokemonList = ({ pokemons, count, limit, offset, onPageChange, loading }) => {
  const totalPages = Math.ceil(count / limit);
  const currentPage = Math.floor(offset / limit);

  // Ordenar alfabéticamente por nombre
  const sortedPokemons = [...pokemons].sort((a, b) => a.name.localeCompare(b.name));

  const handlePageClick = (data) => {
    const selected = data.selected;
    onPageChange(selected * limit);
  };

  const handlePokemonClick = (e, pokemonName) => {
    e.preventDefault();
    window.open(`http://localhost:8080/api/pokemon/${pokemonName}`, '_blank');
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
    </div>
  );
};

export default PokemonList; 