const GET_CURRENCY_CONVERTER_RESPONSE= {
    SUCCES: {
        statusCode: 200,
        body: {
            base_currency_code: 'ARS',
            base_currency_name: 'Argentine peso',
            amount: '1200.0000',
            updated_date: '2024-12-18',
            rates: {
                USD: {
                    'currency_name': 'United States dollar',
                    'rate': '0.0010',
                    'rate_for_amount': '1.1739'
                }
            },
            status: 'success'
        }
    },
    UNAUTHORIZED: {
        statusCode: 401,
        body: {
            message: 'Invalid API key. Go to https://docs.rapidapi.com/docs/keys for more info.'
        }
    }
}

module.exports = { GET_CURRENCY_CONVERTER_RESPONSE };