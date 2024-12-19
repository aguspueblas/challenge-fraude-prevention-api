const { GET_CURRENCY_CONVERTER_REQUEST } = require('./business/request/connectors/get-currency-converter.request')
const { GET_CURRENCY_CONVERTER_RESPONSE } = require('./business/response/connectors/get-currency-converter.response')
const MockServer = require('./msw/server')
module.exports = {
    ...MockServer,
    ConnectorsMock: {
        GetCurrencyConverter: {
            Request: GET_CURRENCY_CONVERTER_REQUEST,
            Response: GET_CURRENCY_CONVERTER_RESPONSE
        }
    }
}