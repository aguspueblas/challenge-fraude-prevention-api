Levantar imagen de Docker.

PRE-REQUISITOS: 1. Tener Docker instalado. 2. Docker debe estar encendido.

INFO ADICIONAL: - Tener en cuenta que cualquier cambio que se realice en el archivo Docker File va a necesitar volver a construir la imagen.

PASO 1:
1.1. Construir la imagen del repositorio en Docker con el comando - docker build -t mi-api-rest .
_Observación_ Reemplazar mi-api-rest por el nombre del repositorio.
1.2. Una vez finalido el proceso chequear la creación de la imagen con el comando: - docker images
En el listado devuelvo por la consola debería existir un registro con el nombre del repositorio seleccionado en el PASO 1.
PASO 2:
2.1. Para utilizar la imagen se debe ejecutar un contenedor.
docker run -p 3000:3000 mi-api-rest
Detalles del comando:
_ -p 3000:3000: Expone el puerto 3000 del contenedor en tu máquina host para que puedas acceder a la API.
_ mi-api-rest: Es el nombre que le asignaste a la imagen con docker build.
2.2. Verificar que el contenendor esté corriendo:
docker ps
Deberías ver algo como esto:
CONTAINER ID IMAGE COMMAND CREATED STATUS PORTS NAMES
<container_id> mi-api-rest "npm start" 5 seconds ago Up 3 seconds 0.0.0.0:3000
2.3. Si el contenedor se esta ejecutando correctamente la imagen ya esta disponible para ser utilizada.

PASO 3:
3.1 Cuando se termine de utilizar se debe detener el container.
Ejecutar: docker ps \* Copiar el CONTAINER ID.
docker stop CONTAINER_ID (Colpcar el ID obteniendo con el comando docker ps.)
