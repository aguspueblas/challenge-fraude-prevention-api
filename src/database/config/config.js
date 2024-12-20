const envDB = require("../../../config/env").DB;

const configDB = {
  development: {
    username: envDB.DB_USER || "admin",
    password: envDB.DB_PASSWORD || "admin123",
    database: envDB.DB_NAME || "challenge-meli",
    host: envDB.DB_HOST || "data-base-pg", // Nombre del contenedor de la base de datos
    port: envDB.DB_PORT || 5432, // Puerto de PostgreSQL
    dialect: "postgres",
    logging: false
  },
  test: {
    username: envDB.DB_USER || "admin",
    password: envDB.DB_PASSWORD || "admin123",
    database: envDB.DB_NAME || "challenge-meli",
    host: envDB.DB_HOST || "localhost",
    port: envDB.DB_PORT || 5432,
    dialect: "postgres",
    logging: false
  },
  production: {
    username: envDB.DB_USER || "admin",
    password: envDB.DB_PASSWORD || "admin123",
    database: envDB.DB_NAME || "challenge-meli",
    host: envDB.DB_HOST || "localhost",
    port: envDB.DB_PORT || 5432,
    dialect: "postgres",
    logging: false
  },
};

module.exports = configDB;
