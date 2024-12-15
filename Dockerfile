# Usa la imagen oficial de Node.js 20 como base
FROM node:20
# Establece el directorio de trabajo en /app
WORKDIR /app
# Copia el archivo package.json y package-lock.json al directorio de trabajo
COPY package.json package-lock.json ./
# Instala las dependencias del proyecto
RUN npm install
# Copia el resto del código de la aplicación al directorio de trabajo
COPY . .
# Expone el puerto en el que la aplicación se ejecutará
EXPOSE 3000
# Define el comando por defecto para ejecutar la aplicación
CMD ["npm", "start"]