const { Redis } = require("ioredis");

// Configuración de Redis, asumiendo que tienes Redis ejecutándose en un contenedor de Docker
const redis = new Redis({
  host: process.env.REDIS_HOST || "localhost", // Cambiar por la IP del contenedor si usas Docker
  port: process.env.REDIS_PORT || 6379, // Puerto por defecto de Redis
  password: process.env.REDIS_PASSWORD || null, // Si tienes contraseña, añádela aquí
});

module.exports = redis;
