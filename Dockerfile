# Usa la imagen oficial de Node.js 20 como base
FROM node:20
# Establece el directorio de trabajo en /app
WORKDIR /app
# Instalar dockerize
RUN apt-get update && apt-get install -y wget && \
    wget https://github.com/jwilder/dockerize/releases/download/v0.6.1/dockerize-linux-amd64-v0.6.1.tar.gz && \
    tar -xzvf dockerize-linux-amd64-v0.6.1.tar.gz && \
    mv dockerize /usr/local/bin/
# Copia el archivo package.json y package-lock.json al directorio de trabajo
COPY package*.json ./
# Instala las dependencias del proyecto
RUN npm install
# Copia el resto del código de la aplicación al directorio de trabajo
COPY . .
# Expone el puerto en el que la aplicación se ejecutará
EXPOSE 3000
# Define el comando por defecto para ejecutar la aplicación
CMD ["sh", "-c", "dockerize -wait tcp://data-base-pg:5432 -timeout 30s && npm run migrate && npm start"]