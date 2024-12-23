const GetCurrencyConverteConnector = require("./connectors/get-currency-converter.connector");
const RedisService = require("./redis-service");
class GetCurrencyConverterService {
  #service;
  #redisService;
  constructor() {
    this.#service = new GetCurrencyConverteConnector();
    this.#redisService = new RedisService();
  }

  async getRate(from, to) {
    try {
      let rate;
      const key = `${from}-${to}`;
      rate = await this.#redisService.getKeyRedis(key);
      if (!rate) {
        console.info("Se consulta la tarifa para: " + key);
        const rateFound = await this.getConvertedCurrency(from, to);
        this.#redisService.setKeyRedis(key, rateFound.rates.USD.rate);
        rate = rateFound.rates.USD.rate;
      }
      return parseFloat(rate);
    } catch (error) {
      console.error("Ocurrio un error obteniendo la tarifa: " + error.message);
      throw error;
    }
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
