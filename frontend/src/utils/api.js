const API_URL = 'http://localhost:8080/api/pokemon';

export async function fetchPokemons({ search = '', limit = 20, offset = 0 }) {
  const cacheKey = `pokemon_${search}_${limit}_${offset}`;
  const cached = localStorage.getItem(cacheKey);
  if (cached) {
    return JSON.parse(cached);
  }
  const params = new URLSearchParams({ search, limit, offset });
  const res = await fetch(`${API_URL}?${params}`);
  if (!res.ok) throw new Error('Error al obtener datos');
  const data = await res.json();
  localStorage.setItem(cacheKey, JSON.stringify(data));
  return data;
} 