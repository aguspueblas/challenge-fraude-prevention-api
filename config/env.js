require("dotenv").config();

const ConfigEnv = {
  DB: {
    DB_HOST: process.env.DB_HOST,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_NAME: process.env.DB_NAME,
    DB_PORT: process.env.DB_PORT,
  },
  AUTH: {
    API_KEY: process.env.API_KEY,
  },
  SERVER: {
    PORT: process.env.PORT || 3000, // Puerto en el que corre la API
    NODE_ENV: process.env.NODE_ENV || "development", // Entorno de ejecución (dev, prod, qa)
  },
  RAPID_API: {
    API_KEY: process.env.RAPID_API_KEY
  },
  REDIS: {
    host: process.env.REDIS_HOST || 'localhost', // Cambiar por la IP del contenedor si usas Docker
    port: process.env.REDIS_PORT || 6379,       // Puerto por defecto de Redis
    password: process.env.REDIS_PASSWORD || null // Si tienes contraseña, añádela aquí

  }
};

module.exports = ConfigEnv;
