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
};

module.exports = ConfigEnv;
