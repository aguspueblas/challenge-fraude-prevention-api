const GET_CURRENCY_CONVERTER_REQUEST = {
    HEADERS: {
        "x-rapidapi-host": "currency-converter5.p.rapidapi.com",
        "x-rapidapi-key": "c1b48bb8d2mshc000faab13a9e7ap1ebc82jsnfbb385552c49"
    },
    PARAMS: {
        format: 'json',
        from: 'ARS',
        to: 'USD',
        amount: '1000',
        language: 'en'
    }
}

module.exports = { GET_CURRENCY_CONVERTER_REQUEST };