'use strict'
const {describe, before, after, afterEach, it} = require('node:test')
const GetCurrencyConverteConnector = require("../../../src/services/connectors/get-currency-converter.connector");
const { Msw, ConnectorsMock } = require("../../mock")
const assert = require('node:assert/strict')

describe(`UNIT TEST: Connector de currency-converter`, function () {
    before(() =>{
        Msw.listen();
    })
    after(() => {
        Msw.close();
    })

    afterEach(() => {
        Msw.resetHandlers();
    });

    it.only('1. STATUS 200 con respuesta exitosa.', async () => {
        const connector = new GetCurrencyConverteConnector();
        const params = ConnectorsMock.GetCurrencyConverter.Request.PARAMS;
        connector.setParams(params.from,params.to, params.amount);
        try {
            const response = await connector.callConnector();
            assert.deepStrictEqual(response, ConnectorsMock.GetCurrencyConverter.Response.SUCCES.body)
        } catch (error) {
            console.error(error);
            throw error;
        }
        
    })

    it('2. STATUS 401 Unauthorized.', () => {

    })
})