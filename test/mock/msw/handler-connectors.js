// src/mocks/handlers.js
const { http, HttpResponse } = require("msw");
const {
  GET_CURRENCY_CONVERTER_RESPONSE,
} = require("../business/response/connectors/get-currency-converter.response");

// Mock de la respuesta para el convertidor de divisas
module.exports = [
  http.get(
    "https://currency-converter5.p.rapidapi.com/currency/convert",
    ({}) => {
      // Si todos los parámetros están bien, devolver una respuesta mockeada
      return HttpResponse.json(GET_CURRENCY_CONVERTER_RESPONSE.SUCCES.body, {
        status: GET_CURRENCY_CONVERTER_RESPONSE.SUCCES.statusCode,
      });
    },
  ),
];
