import React, { useState } from 'react';
import './PokemonDetailModal.css';

const PokemonDetailModal = ({ pokemon, onClose }) => {
  const [activeTab, setActiveTab] = useState('info');

  if (!pokemon) return null;

  const renderInfoTab = () => (
    <div className="pokemon-info">
      <h2>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2>
      <div className="pokemon-stats">
        <div className="stat">
          <span>Altura:</span> {pokemon.height / 10}m
        </div>
        <div className="stat">
          <span>Peso:</span> {pokemon.weight / 10}kg
        </div>
        <div className="stat">
          <span>Experiencia base:</span> {pokemon.base_experience}
        </div>
      </div>
      <div className="pokemon-types">
        <h3>Tipos:</h3>
        {pokemon.types.map((type, index) => (
          <span key={index} className={`type-badge type-${type.type.name}`}>
            {type.type.name}
          </span>
        ))}
      </div>
      <div className="pokemon-abilities">
        <h3>Habilidades:</h3>
        {pokemon.abilities.map((ability, index) => (
          <div key={index} className="ability">
            {ability.ability.name}
            {ability.is_hidden && <span className="hidden-badge">(Oculta)</span>}
          </div>
        ))}
      </div>
    </div>
  );

  const renderSpritesTab = () => (
    <div className="pokemon-sprites">
      <h3>Sprites</h3>
      <div className="sprite-grid">
        {pokemon.sprites.front_default && (
          <div className="sprite-item">
            <h4>Normal</h4>
            <img src={pokemon.sprites.front_default} alt="Front Default" />
          </div>
        )}
        {pokemon.sprites.front_shiny && (
          <div className="sprite-item">
            <h4>Shiny</h4>
            <img src={pokemon.sprites.front_shiny} alt="Front Shiny" />
          </div>
        )}
        {pokemon.sprites.other?.['official-artwork']?.front_default && (
          <div className="sprite-item">
            <h4>Arte Oficial</h4>
            <img 
              src={pokemon.sprites.other['official-artwork'].front_default} 
              alt="Official Artwork" 
            />
          </div>
        )}
      </div>
    </div>
  );

  const renderMovesTab = () => (
    <div className="pokemon-moves">
      <h3>Movimientos</h3>
      <div className="moves-grid">
        {pokemon.moves.map((move, index) => (
          <div key={index} className="move-item">
            {move.move.name}
          </div>
        ))}
      </div>
    </div>
  );

  const renderSoundsTab = () => (
    <div className="pokemon-sounds">
      <h3>Sonidos</h3>
      {pokemon.cries && (pokemon.cries.latest || pokemon.cries.legacy) ? (
        <>
          {pokemon.cries.latest && (
            <div className="sound-item">
              <h4>Grito (Latest)</h4>
              <audio controls>
                <source src={pokemon.cries.latest} type="audio/ogg" />
                Tu navegador no soporta el elemento de audio.
              </audio>
            </div>
          )}
          {pokemon.cries.legacy && (
            <div className="sound-item">
              <h4>Grito (Legacy)</h4>
              <audio controls>
                <source src={pokemon.cries.legacy} type="audio/ogg" />
                Tu navegador no soporta el elemento de audio.
              </audio>
            </div>
          )}
        </>
      ) : (
        <p>No hay sonidos disponibles para este Pokémon.</p>
      )}
    </div>
  );

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        
        <div className="modal-tabs">
          <button 
            className={`tab-button ${activeTab === 'info' ? 'active' : ''}`}
            onClick={() => setActiveTab('info')}
          >
            Información
          </button>
          <button 
            className={`tab-button ${activeTab === 'sprites' ? 'active' : ''}`}
            onClick={() => setActiveTab('sprites')}
          >
            Sprites
          </button>
          <button 
            className={`tab-button ${activeTab === 'moves' ? 'active' : ''}`}
            onClick={() => setActiveTab('moves')}
          >
            Movimientos
          </button>
          <button 
            className={`tab-button ${activeTab === 'sounds' ? 'active' : ''}`}
            onClick={() => setActiveTab('sounds')}
          >
            Sonidos
          </button>
        </div>

        <div className="tab-content">
          {activeTab === 'info' && renderInfoTab()}
          {activeTab === 'sprites' && renderSpritesTab()}
          {activeTab === 'moves' && renderMovesTab()}
          {activeTab === 'sounds' && renderSoundsTab()}
        </div>
      </div>
    </div>
  );
};

export default PokemonDetailModal; 