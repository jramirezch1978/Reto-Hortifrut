# Explicación Técnica y Funcional del Proyecto Pokédex Fullstack

## Índice

1. [Arquitectura General](#arquitectura-general)
2. [Backend (Go)](#backend-go)
   - Estructura de archivos
   - Endpoints y flujo
   - Implementación de caché
   - Pruebas
3. [Frontend (React.js)](#frontend-reactjs)
   - Estructura de carpetas
   - Componentes principales
   - Lógica de caché y debouncing
   - Pruebas
4. [Decisiones de diseño](#decisiones-de-diseño)
5. [Resumen visual del flujo](#resumen-visual-del-flujo)

---

## 1. Arquitectura General

- **Fullstack:** Backend en Go, frontend en React.js.
- **Backend:** Expone endpoints propios, consume la PokéAPI y cachea resultados en memoria.
- **Frontend:** Consume los endpoints del backend, cachea resultados en localStorage y aplica debouncing en la búsqueda.

---

## 2. Backend (Go)

### Estructura de archivos

- `main.go`: Arranque del servidor, definición de rutas y handlers.
- `pokemon_api.go`: Lógica para el listado de Pokémon.
- `pokemon_detail_api.go`: Lógica para el detalle de Pokémon.
- `cache.go`: Implementación de caché en memoria, genérica y segura para concurrencia.
- `pokemon_api_test.go`: Pruebas unitarias.

### Endpoints y flujo

#### a) Listado de Pokémon

- **Endpoint:** `/api/pokemon?search=...&limit=...&offset=...`
- **Flujo:**
  1. Busca en caché si ya existe la respuesta para esa búsqueda y paginación.
  2. Si no está, consulta la PokéAPI, filtra, ordena y pagina los resultados.
  3. Guarda la respuesta en caché.
  4. Devuelve la lista paginada y filtrada al frontend.

#### b) Detalle de Pokémon

- **Endpoint:** `/api/pokemon/{id}`
- **Flujo:**
  1. Busca en caché si ya existe el detalle de ese Pokémon.
  2. Si no está, consulta la PokéAPI y guarda el resultado en caché.
  3. Devuelve el detalle al frontend.

### Implementación de caché

- **Archivo:** `cache.go`
- **Funciones:**
  - `NewCache(ttl time.Duration) *Cache`: Crea una caché con tiempo de vida.
  - `Get(key string) (interface{}, bool)`: Obtiene un valor si existe y no ha expirado.
  - `Set(key string, data interface{})`: Guarda un valor con expiración.
  - `Delete(key string)`: Elimina un valor de la caché.
- **Uso:**
  - En `main.go`, se crean dos instancias: una para la lista y otra para los detalles.
  - Los handlers usan `Get` y `Set` para cachear respuestas.

### Pruebas

- Pruebas unitarias en `pokemon_api_test.go` para verificar la obtención de lista y detalle.

---

## 3. Frontend (React.js)

### Estructura de carpetas

- `components/SearchBar/`
- `components/PokemonList/`
- `components/PokemonDetailModal/`
- `components/Paginator/`
- `utils/` (funciones auxiliares y API)
- `App.js`

### Componentes principales

- **SearchBar:** Input de búsqueda con debouncing.
- **PokemonList:** Tabla de Pokémon paginada.
- **PokemonDetailModal:** Modal con detalle del Pokémon.
- **Paginator:** Navegación entre páginas.

### Lógica de caché y debouncing

- **Caché:** Usa `localStorage` para guardar resultados de cada búsqueda y página.
- **Debouncing:** Espera a que el usuario termine de escribir antes de buscar, evitando llamadas innecesarias.

### Pruebas

- Pruebas unitarias con React Testing Library para los componentes principales.

---

## 4. Decisiones de diseño

- **Separación de responsabilidades:** Cada archivo y función tiene una única responsabilidad.
- **Caché:** Mejora el rendimiento y reduce la carga en la PokéAPI y el backend.
- **Debouncing:** Evita llamadas innecesarias y mejora la UX.
- **Paginación y búsqueda:** Permiten manejar grandes volúmenes de datos de forma eficiente.
- **Pruebas:** Garantizan la calidad y mantenibilidad del código.
- **Modularidad:** Facilita el mantenimiento y la escalabilidad.

---

## 5. Resumen visual del flujo

```
[Usuario] → [Frontend] → [Backend] → [PokéAPI]
     ↑           ↓           ↑
 [localStorage] [Caché en memoria]
```

1. El usuario interactúa con el frontend (busca, pagina, ve detalles).
2. El frontend consulta el backend, usando caché local si es posible.
3. El backend responde usando su propia caché en memoria o consultando la PokéAPI si es necesario.
4. Todo el flujo está optimizado para minimizar llamadas externas y mejorar la experiencia de usuario.

---

**Nota:** Si necesitas este archivo en formato Word, puedes abrirlo con Word directamente o convertirlo fácilmente desde Markdown.
