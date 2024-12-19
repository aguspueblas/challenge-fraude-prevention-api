const GetCurrencyConverteConnector = require("./connectors/get-currency-converter.connector");

class GetCurrencyConverterService {
  #service;
  constructor() {
    this.#service = new GetCurrencyConverteConnector();
  }

  async getConvertedCurrency(from, to, amount) {
    try {
      this.#service.setParams(from, to, amount);
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
