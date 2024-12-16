require('dotenv').config(); //Carga de variables de entorno.
module.exports = {
    development: {
        username: process.env.DB_USER || 'admin',
        password: process.env.DB_PASSWORD || 'admin123',
        database: process.env.DB_NAME || 'challenge-meli',
        host: process.env.DB_HOST || 'data-base-pg', // Nombre del contenedor de la base de datos
        port: process.env.DB_PORT || 5432, // Puerto de PostgreSQL
        dialect: 'postgres',
    },
    test: {
        username: process.env.DB_USER || 'admin',
        password: process.env.DB_PASSWORD || 'admin123',
        database: process.env.DB_NAME || 'challenge-meli',
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 5432,
        dialect: 'postgres',
    },
    production: {
        username: process.env.DB_USER || 'admin',
        password: process.env.DB_PASSWORD || 'admin123',
        database: process.env.DB_NAME || 'challenge-meli',
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 5432,
        dialect: 'postgres',
    }
};
