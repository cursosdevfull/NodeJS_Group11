# Docker Compose

### Para ejecutar un docker compose

```
docker compose up
docker compose up -d
```

### Para eliminar

```
docker compose down
```

### Para ver el estado de los contenedores

```
docker compose ps
```

### Para ejecutar solamente algunos servicios

```
docker compose up -d <nombre del servicio 1> <nombre del servicio 2>...
```

### Para ejecutar un docker compose con un nombre personalizado

```
docker compose -f <nombre del docker compose yaml> up -d
docker compose -f <ruta>/<nombre del docker compose yaml> up -d
```
