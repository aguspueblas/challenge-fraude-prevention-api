# Levantar la API con Docker

Este documento proporciona los pasos necesarios para levantar la API utilizando Docker y Docker Compose, incluyendo la base de datos PostgreSQL. La configuración está preparada para ser ejecutada en entornos de desarrollo.

## Requisitos Previos

Antes de comenzar, asegúrate de tener los siguientes requisitos previos instalados en tu máquina:

- **Docker**: [Descargar Docker](https://docs.docker.com/get-docker/)
- **Docker Compose**: [Descargar Docker Compose](https://docs.docker.com/compose/install/)
- **Node.js** y **npm**.

---

## Pasos para Levantar la API

### 1. Clonar el Repositorio
    Url del repositorio en GITHUB: https://github.com/aguspueblas/challenge-fraude-prevention-api 

### 2. Construir imagenes de Docker.
 Ubicado en src/database/config 
 * Ejecutar el comando: docker-compose build

### 3. Ejecutar contenedores.
Para iniciar los contenedores para poder utilizar los servicios de la API ejecutar:
 * docker-compose up -d (-d ejecución en segundo plano).
 * Chequear que las imagenes se crearon con exito utilizando el comando: *docker ps*. 
 Ejemplo:
     CONTAINER ID   IMAGE             COMMAND                  CREATED          STATUS          PORTS                    NAMES
    27b141a16db8   config-app        "docker-entrypoint.s…"   18 minutes ago   Up 18 minutes   0.0.0.0:3000->3000/tcp   challenge-meli-api
    1f033097d90a   postgres:latest   "docker-entrypoint.s…"   18 minutes ago   Up 18 minutes   0.0.0.0:5432->5432/tcp   database-pg

### 4. Detener los Contenedores
Cuando hayas terminado de trabajar, puedes detener los contenedores con:
    * docker-compose down
    Este comando detendrá los contenedores sin eliminar los volúmenes. Si deseas eliminar los volúmenes (por ejemplo, borrar la base de datos), puedes hacerlo con:
    * docker-compose down -v 