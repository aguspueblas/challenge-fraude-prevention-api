const GetCurrencyConverteConnector = require("./connectors/get-currency-converter.connector");
const redis = require("../../config/redis.config");
class GetCurrencyConverterService {
  #service;
  constructor() {
    this.#service = new GetCurrencyConverteConnector();
  }

  async getRate(from, to) {
    try {
      let rate;
      const key = `${from}-${to}`;
      rate = await this.getKeyRedis(key);
      if (!rate) {
        console.info("Se consulta la tarifa para: " + key);
        rate = await this.getConvertedCurrency(from, to);
        this.setKeyRedis(key, rate.rates.USD.rate);
      }
      return parseFloat(rate);
    } catch (error) {
      console.error("Ocurrio un error obteniendo la tarifa: " + error.message);
      throw error;
    }
  }

  // Función para obtener el valor de Redis
  async getKeyRedis(key) {
    const value = await redis.get(key);
    return value ? JSON.parse(value) : null; // Si existe, retorna el valor, sino retorna null
  }

  // Función para establecer el valor en Redis con un tiempo de expiración
  async setKeyRedis(key, value, expirationTime = 300) {
    await redis.set(key, JSON.stringify(value), "EX", expirationTime);
  }
  async getConvertedCurrency(from, to) {
    try {
      this.#service.setParams(from, to);
      const response = await this.#service.callConnector();
      return response;
    } catch (error) {
      console.error(
        "ERROR in GET_CURRENCY_CONVERTER_SERVICE.getConverterCurrency",
        error,
      );
      throw error;
    }
  }
}
module.exports = GetCurrencyConverterService;
