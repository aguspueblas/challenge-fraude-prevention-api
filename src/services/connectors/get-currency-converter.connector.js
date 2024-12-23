const ConfigEnv = require("../../../config/env");
const axios = require("axios");
const https = require("https");
const { ErrorConstructor } = require("../../helpers/error-constructor");
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

  setParams(from, to) {
    this.#params = {
      format: "json",
      from,
      to,
      language: "en",
    };
  }
  delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  async callConnector() {
    const options = {
      method: "GET",
      url: this.#url,
      params: this.#params,
      headers: this.#getHeaders(),
      httpsAgent: new https.Agent({ rejectUnauthorized: false }),
    };
    //Se aplica este delay porque la API de conversión no permite peticiones seguidas. Esto se debe a que tengo el plan free.
    await this.delay(1000);
    return axios(options)
      .then((response) => {
        console.info(
          "Convertidor de moneda respondio con éxito.",
          response.data,
        );
        return response.data;
      })
      .catch((error) => {
        console.error(
          "Ocurrio un error en CURRENCY-CONVERTER-CONTROLLER.js:",
          error.response,
        );
        throw ErrorConstructor("error-converter", error.message);
      });
  }
}
module.exports = GetCurrencyConverteConnector;
