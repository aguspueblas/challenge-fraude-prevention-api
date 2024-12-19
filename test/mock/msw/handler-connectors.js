const { HttpResponse, http } = require("msw");
const { GET_CURRENCY_CONVERTER_RESPONSE } = require("../business/response/connectors/get-currency-converter.response");
module.exports = [
    //Mock de respuesta para el convertidor de divisa.
    http.get(
        'https://currency-converter5.p.rapidapi.com/currency/convert/:format/:from/:to/:amount/:language', () => {
            return HttpResponse.json(GET_CURRENCY_CONVERTER_RESPONSE.SUCCES.body, {
                status: GET_CURRENCY_CONVERTER_RESPONSE.SUCCES.statusCode
        });
    })
]