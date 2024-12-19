const ConfigEnv = require("../../../config/env");
const axios = require("axios");

class GetCurrencyConverteConnector {
  #url;
  #params;

  constructor() {
    this.#url = `https://currency-converter5.p.rapidapi.com/currency/convert`;
  }

  #getHeaders() {
    return {
      "x-rapidapi-key": ConfigEnv.RAPID_API.API_KEY,
      "x-rapidapi-host": "currency-converter5.p.rapidapi.com",
    };
  }

  setParams(from, to, amount) {
    this.#params = {
      format: "json",
      from,
      to,
      amount,
      language: "en",
    };
  }

  async callConnector() {
    const options = {
      method: "GET",
      url: this.#url,
      params: this.#params,
      headers: this.#getHeaders(),
    };

    try {
      const response = await axios.request(options);
      return response.data;
    } catch (error) {
      console.error(
        "Ocurrio un error en CURRENCY-CONVERTER-CONTROLLER.js:",
        error,
      );
      throw error;
    }
  }
}
module.exports = GetCurrencyConverteConnector;
