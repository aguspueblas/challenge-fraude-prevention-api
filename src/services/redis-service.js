const redis = require("../../config/redis.config");

class RedisService {
  constructor() {}
  // Función para obtener el valor de Redis
  async getKeyRedis(key) {
    const value = await redis.get(key);
    return value ? JSON.parse(value) : null; // Si existe, retorna el valor, sino retorna null
  }

  // Función para establecer el valor en Redis con un tiempo de expiración
  async setKeyRedis(key, value, expirationTime = 300) {
    await redis.set(key, JSON.stringify(value), "EX", expirationTime);
  }
}
module.exports = RedisService;
