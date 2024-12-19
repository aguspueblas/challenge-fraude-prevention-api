const redis = require("../../config/redis.config");

// Función para obtener el valor de Redis
async function getKeyRedis(key) {
  const value = await redis.get(key);
  return value ? JSON.parse(value) : null; // Si existe, retorna el valor, sino retorna null
}

// Función para establecer el valor en Redis con un tiempo de expiración
async function setKeyRedis(key, value, expirationTime = 300) {
  // Expiración por defecto de 5 minutos (300 segundos)
  await redis.set(key, JSON.stringify(value), "EX", expirationTime);
}

module.exports = {
  getKeyRedis,
  setKeyRedis,
};
