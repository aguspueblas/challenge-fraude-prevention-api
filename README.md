## Descripción de la API

Esta API se encarga de la prevención de fraudes en pagos de usuarios, realizando análisis sobre transacciones recientes. Utiliza una base de datos PostgreSQL para almacenar los pagos y la información de los usuarios, y un servicio externo para obtener tasas de conversión de moneda.

Los servicios principales de la API incluyen:

- Análisis de pagos rechazados en los últimos 7 días.
- Conversión de montos de pagos a USD.
- Validación de pagos rechazados durante las últimas 24 horas.

## Variables de Entorno

Revisar el archivo env.example.

## Seguridad de la API - Autenticación con API Key

La API está protegida mediante autenticación por **API Key**. Esto significa que cada solicitud debe incluir una clave de API válida en los encabezados de la solicitud.

### ¿Cómo enviar la clave de API?

La clave de API debe enviarse en el encabezado de la solicitud bajo el nombre `api-key`.

## Documentación del repositorio.

Este proyecto cuenta con su documentación en la ruta: /doc.

# Levantar la API con Docker

Este documento proporciona los pasos necesarios para levantar la API utilizando Docker y Docker Compose, incluyendo la base de datos PostgreSQL. La configuración está preparada para ser ejecutada en entornos de desarrollo.

## Requisitos Previos

Antes de comenzar, asegúrate de tener los siguientes requisitos previos instalados en tu máquina:

- **Docker**: [Descargar Docker](https://docs.docker.com/get-docker/)
- **Docker Compose**: [Descargar Docker Compose](https://docs.docker.com/compose/install/)
- **Node.js** y **npm**.

---

## Pasos para Levantar la API

Por favor si ocurre algun inconveniente en este punto no duden en mandarme email: agustincesarpueblas@gmail.com.

### 1. Clonar el Repositorio

    Url del repositorio en GITHUB: https://github.com/aguspueblas/challenge-fraude-prevention-api

### 2. Construir imagenes de Docker.

Ubicado en src/config

- Ejecutar el comando: docker-compose build

### 3. Ejecutar contenedores.

Para iniciar los contenedores para poder utilizar los servicios de la API ejecutar:

- docker-compose up -d (-d ejecución en segundo plano).
- Chequear que las imagenes se crearon con exito utilizando el comando: _docker ps_.
  Ejemplo:
  CONTAINER ID IMAGE COMMAND CREATED STATUS PORTS NAMES
  27b141a16db8 config-app "docker-entrypoint.s…" 18 minutes ago Up 18 minutes 0.0.0.0:3000->3000/tcp challenge-meli-api
  1f033097d90a postgres:latest "docker-entrypoint.s…" 18 minutes ago Up 18 minutes 0.0.0.0:5432->5432/tcp database-pg

### 4. Detener los Contenedores

Cuando hayas terminado de trabajar, puedes detener los contenedores con:
_ docker-compose down
Este comando detendrá los contenedores sin eliminar los volúmenes. Si deseas eliminar los volúmenes (por ejemplo, borrar la base de datos), puedes hacerlo con:
_ docker-compose down -v
