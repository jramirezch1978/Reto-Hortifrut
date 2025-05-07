# Pokédex Fullstack

Aplicación fullstack que consume la PokéAPI, con backend en Go y frontend en React.js. Implementa búsqueda, paginación, caché y pruebas automatizadas.

## Estructura del Proyecto

```
.
├── backend/
│   ├── main.go                  # Punto de entrada y configuración del servidor
│   ├── pokemon_api.go           # Endpoints principales y lógica de negocio
│   ├── pokemon_detail_api.go    # Endpoint de detalles de Pokémon
│   ├── pokemon_api_test.go      # Pruebas unitarias del backend
│   ├── go.mod                   # Dependencias de Go
│   ├── response.json            # Datos de ejemplo para pruebas
│   ├── ResponseAllData.json     # Datos de ejemplo para pruebas
│   └── README.md               # Documentación del backend
│
└── frontend/
    ├── public/                 # Archivos estáticos
    ├── src/
    │   ├── components/
    │   │   ├── PokemonList/    # Componente de listado y paginación
    │   │   ├── PokemonDetailModal/ # Modal de detalles
    │   │   ├── SearchBar/      # Barra de búsqueda con debouncing
    │   │   └── test/          # Pruebas unitarias de componentes
    │   ├── test/              # Pruebas generales
    │   ├── utils/             # Utilidades y helpers
    │   ├── App.js             # Componente principal
    │   ├── App.css            # Estilos globales
    │   ├── App.test.js        # Pruebas del componente App
    │   ├── index.js           # Punto de entrada
    │   ├── index.css          # Estilos globales
    │   ├── setupTests.js      # Configuración de pruebas
    │   ├── reportWebVitals.js # Métricas de rendimiento
    │   └── logo.svg           # Assets
    ├── package.json           # Dependencias y scripts
    ├── package-lock.json      # Lock de dependencias
    └── .gitignore            # Archivos ignorados por git
```

## Requisitos Previos

### Backend (Go)

- Go 1.16 o superior
- Para Windows, se recomienda usar Chocolatey:
  ```bash
  choco install golang
  ```

### Frontend (React)

- Node.js 14.x o superior
- Para Windows, se recomienda usar Chocolatey:
  ```bash
  choco install nodejs
  ```

## Instalación

### Backend

```bash
cd backend
go mod download
```

### Frontend

```bash
cd frontend
npm install
```

## Ejecución

### Backend

```bash
cd backend
go run main.go
```

El servidor se ejecutará en `http://localhost:8080`

### Frontend

```bash
cd frontend
npm start
```

La aplicación se ejecutará en `http://localhost:3000`

## Pruebas Automatizadas

### Backend

Para ejecutar las pruebas del backend:

```bash
cd backend
go test ./... -v
```

Las pruebas del backend incluyen:

- Pruebas de obtención de lista de Pokémon
- Pruebas de obtención de detalles
- Pruebas de caché
- Pruebas de manejo de errores

### Frontend

Para ejecutar las pruebas del frontend:

```bash
cd frontend
npm test
```

Para ver los resultados detallados de las pruebas:

```bash
npm test -- --verbose
```

Para ejecutar pruebas específicas:

```bash
# Ejecutar pruebas de un componente específico
npm test -- PokemonList
npm test -- PokemonDetailModal
npm test -- SearchBar

# Ejecutar pruebas en modo watch (útil durante el desarrollo)
npm test -- --watch

# Ejecutar pruebas con cobertura
npm test -- --coverage
```

Las pruebas del frontend incluyen:

- Pruebas de renderizado de componentes
- Pruebas de interacción de usuario
- Pruebas de manejo de estados
- Pruebas de integración con la API

## Tecnologías Utilizadas

### Backend

- Go
- Gin (Framework web)
- Testing package de Go
- Caché en memoria

### Frontend

- React.js
- React Testing Library
- Jest
- CSS Modules
- React Paginate
- localStorage para caché
- Debouncing para búsqueda

## Características Implementadas

### Funcionalidades Principales

- Listado de Pokémon con paginación
- Búsqueda de Pokémon por nombre
- Detalles completos de cada Pokémon
- Interfaz moderna y responsive

### Optimizaciones

- Caché en memoria (backend)
- Caché en localStorage (frontend)
- Debouncing en la búsqueda
- Paginación eficiente

### Calidad de Código

- Pruebas unitarias en backend y frontend
- Estructura modular y mantenible
- Código documentado
- Buenas prácticas de desarrollo

### UI/UX

- Diseño moderno y responsive
- Feedback visual de carga
- Manejo de errores amigable
- Transiciones suaves

## Endpoints de la API

### Backend

- `GET /api/pokemon?search=&limit=20&offset=0` - Listado con búsqueda y paginación
- `GET /api/pokemon/{nombre}` - Detalles de un Pokémon específico

## Contacto

Para dudas técnicas, mejoras o sugerencias; contacta al desarrollador del reto:

- **Correo:** jramirez@npssac.com.pe
