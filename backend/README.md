# Backend - Reto Pokémon

Este es el backend en Go para el reto de consumo de la PokeAPI.

## Requisitos
- Go 1.20 o superior

## Instalación y ejecución

```bash
cd backend
# Instala dependencias (si es necesario)
go mod tidy
# Ejecuta el servidor
go run main.go
```

El servidor estará disponible en: http://localhost:8080

## Endpoint disponible

- `/api/pokemon?search=&limit=&offset=`
  - `search`: (opcional) texto para buscar por nombre de Pokémon
  - `limit`: (opcional) cantidad de resultados por página (default: 20)
  - `offset`: (opcional) desplazamiento para paginación (default: 0)

## Notas
- El backend implementa caché en memoria para mejorar el rendimiento. 