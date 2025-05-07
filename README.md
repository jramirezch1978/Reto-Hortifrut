# Pokédex Fullstack Challenge

## Descripción

Este proyecto es una Pokédex fullstack que consume la PokéAPI desde un backend en Go y expone los datos a un frontend moderno en React.js. Incluye búsqueda, paginación, caché en frontend y backend, y buenas prácticas de estructura y código.

---

## Estructura del Proyecto

```
/
├── backend/                # Backend en Go
├── frontend/               # Frontend en React.js
├── README.md               # Este archivo
├── Texto-reto.txt          # Instrucciones del reto
└── ...
```

---

## Requisitos previos

### 1. Instalar Go (si no lo tienes)

En Windows, puedes usar Chocolatey:

```sh
choco install golang
```

O descarga desde: https://go.dev/dl/

### 2. Instalar Node.js y npm (si no lo tienes)

Descarga desde: https://nodejs.org/

---

## Backend (Go)

### Instalación y ejecución

1. Ve a la carpeta del backend:
   ```sh
   cd backend
   ```
2. Ejecuta el backend (esto compilará y levantará el servidor en http://localhost:8080):
   ```sh
   go run .
   ```

   > **Nota:** El punto (`.`) le dice a Go que ejecute todos los archivos del paquete.
   >

### Consideraciones

- El backend implementa caché en memoria para optimizar llamadas a la PokéAPI.
- El endpoint principal es:
  - `GET /api/pokemon?search=&limit=20&offset=0` (listado, búsqueda y paginación)
  - `GET /api/pokemon/{nombre}` (detalle de un Pokémon)

---

## Frontend (React.js)

### Instalación y ejecución

1. Ve a la carpeta del frontend:
   ```sh
   cd frontend
   ```
2. Instala las dependencias:
   ```sh
   npm install
   ```
3. Levanta la app en modo desarrollo:
   ```sh
   npm start
   ```

   Esto abrirá la app en http://localhost:3000

### Consideraciones

- El frontend usa localStorage para cachear resultados de búsqueda y paginación.
- Implementa debouncing en la barra de búsqueda para evitar múltiples llamadas a la API.
- Los componentes están organizados en carpetas por buena práctica.
- El archivo `.gitignore` ya excluye carpetas como `node_modules` y `build`.

---

## Comandos útiles

### Backend

- Levantar el backend:
  ```sh
  cd backend
  go run .
  ```

### Frontend

- Instalar dependencias:
  ```sh
  cd frontend
  npm install
  ```
- Levantar el frontend:
  ```sh
  npm start
  ```

---

## Tecnologías usadas

- **Backend:** Go (net/http, encoding/json)
- **Frontend:** React.js (create-react-app), localStorage, fetch
- **Estilos:** CSS moderno, flexbox
- **Caché:** localStorage (frontend), memoria (backend)

---

## Decisiones técnicas clave

- El backend centraliza el consumo de la PokéAPI y expone endpoints propios, permitiendo control de caché y lógica de negocio.
- El frontend cachea cada página y búsqueda por separado para máxima eficiencia y experiencia de usuario.
- Se implementó debouncing en la búsqueda para evitar saturar la API.
- La estructura de carpetas sigue buenas prácticas para escalabilidad y mantenibilidad.

---

## Notas adicionales

- Si tienes problemas de puerto en el backend, asegúrate de que no haya otro proceso usando el 8080.
- Si el frontend no conecta, revisa que el backend esté corriendo en http://localhost:8080.
- Para producción, se recomienda usar variables de entorno para las URLs.

---

## Exclusiones de Git

- Las carpetas `node_modules/`, `build/`, y cualquier archivo generado automáticamente no deben subirse al repositorio. El archivo `.gitignore` ya lo contempla.

---

## Contacto

Para dudas técnicas o mejoras, contacta al desarrollador del reto.
