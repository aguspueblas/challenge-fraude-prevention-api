"use strict";
const { describe, before, after, afterEach, it } = require("node:test");
const GetCurrencyConverteConnector = require("../../../src/services/connectors/get-currency-converter.connector");
const { Msw, ConnectorsMock, http } = require("../../mock");
const assert = require("node:assert/strict");
const { HttpResponse } = require("msw");
const {
  GET_CURRENCY_CONVERTER_RESPONSE,
} = require("../../mock/business/response/connectors/get-currency-converter.response");

describe(`UNIT TEST: Connector de currency-converter`, function () {
  before(() => {
    Msw.listen();
  });
  after(() => {
    Msw.close();
  });

  afterEach(() => {
    Msw.resetHandlers();
  });

  it("1. STATUS 200 con respuesta exitosa.", async () => {
    try {
      const connector = new GetCurrencyConverteConnector();
      const params = ConnectorsMock.GetCurrencyConverter.Request.PARAMS;
      connector.setParams(params.from, params.to);
      const response = await connector.callConnector();
      assert.deepStrictEqual(
        response,
        ConnectorsMock.GetCurrencyConverter.Response.SUCCES.body,
      );
    } catch (error) {
      console.error(error);
      throw error;
    }
  });

  it("2. Falla en el servicio de currency converter.", async () => {
    try {
      Msw.use(
        http.get(
          "https://currency-converter5.p.rapidapi.com/currency/convert",
          ({}) => {
            // Si todos los parámetros están bien, devolver una respuesta mockeada
            return HttpResponse.json(
              GET_CURRENCY_CONVERTER_RESPONSE.UNAUTHORIZED.body,
              {
                status: GET_CURRENCY_CONVERTER_RESPONSE.UNAUTHORIZED.statusCode,
              },
            );
          },
        ),
      );
      const connector = new GetCurrencyConverteConnector();
      const params = ConnectorsMock.GetCurrencyConverter.Request.PARAMS;
      connector.setParams(params.from, params.to);
      const response = await connector.callConnector();
    } catch (error) {
      assert.deepStrictEqual(error.code, "error-converter");
      console.error(error);
    }
  });
});
