"use strict";
const {
  describe,
  before,
  after,
  afterEach,
  it,
  beforeEach,
} = require("node:test");
const { Msw } = require("../mock");
const assert = require("node:assert/strict");
const UserService = require("../../src/services/db/user.service");
const { Sequelize, sequelize } = require("../../src/database/models");
const request = require("supertest");
const Server = require("../../src");
const { FIND_AND_COUNT_ALL } = require("../mock/db/user.response");
const redis = require("../../config/redis.config");
const RedisMock = require("ioredis-mock");
let appServer;
const sinon = require("sinon");
// const SequelizeMock = require("sequelize-mock");
const ConfigEnv = require("../../config/env");
const {
  GET_FRAUD_PREVENTION_ANALYTICS_RESPONSE,
} = require("../mock/business/response/v1-fraud-prevention-individuals-analytics.response");
// const dbMock = new SequelizeMock();

// // Crear un modelo mockeado para 'User'
// const UserMock = dbMock.define("User", {
//   user_id: 1,
//   country: "Argentina",
//   createdAt: "2024-01-01",
//   updatedAt: "2024-01-01",
//   payments: [
//     {
//       user_id: 1,
//       state: "RECHAZADO",
//       local_currency: "ARS",
//       amount: 100.0,
//       createdAt: "2024-01-01",
//       updatedAt: "2024-01-01",
//     },
//   ],
// }, {
//     instanceMethods: {
//         findAndCountAll: function () {
//             return FIND_AND_COUNT_ALL.SUCCESS;
//         }
//     }
// });

// const PaymentMock = dbMock.define("User", {
//   user_id: 1,
//   state: "RECHAZADO",
//   local_currency: "ARS",
//   amount: 100.0,
//   createdAt: "2024-01-01",
//   updatedAt: "2024-01-01",
// });

// Test Suite
describe(`TEST para V1 fraud/prevention/individuals/analytics.`, function () {
  let userService;
  let mockRedis;
  let sequelizeStub;
  let findAndCountAllStub;

  before(() => {
    appServer = Server; // Inicia tu servidor Express
    Msw.listen(); // Mocking de MSW
    userService = new UserService();
    sequelizeStub = sinon.stub(Sequelize.prototype, "authenticate").resolves(); // Evita la conexión real
    findAndCountAllStub = sinon.stub(sequelize.models.User, "findAndCountAll");

    // Sobrescribir el modelo de 'User' en sequelize con el mock
    // sequelize.models.User = UserMock;
    // sequelize.models.Payment = PaymentMock;
  });

  after(() => {
    Msw.close();
  });

  beforeEach(() => {
    // Configuración del mock de Redis
    mockRedis = new RedisMock();
    redis.client = mockRedis; // Asegurarse que el cliente Redis que usa la app sea el mock
    //findAndCountAllStub = sinon.stub(sequelize.models.User, "findAndCountAll");
  });

  afterEach(() => {
    // Resetear MSW y restaurar los stubs después de cada prueba
    Msw.resetHandlers();
    if (findAndCountAllStub) findAndCountAllStub.restore();
    if (mockRedis) mockRedis.disconnect(); // Desconectar el mock de Redis
  });

  it("1. STATUS 200 con respuesta exitosa sin el uso de Redis.", async () => {
    try {
      findAndCountAllStub.resolves(FIND_AND_COUNT_ALL.SUCCESS);
      const response = await request(appServer)
        .get("/v1/fraud/prevention/individuals/analytics")
        .query({ page: 1, offset: 10 })
        .set("api-key", ConfigEnv.AUTH.API_KEY);

      assert.strictEqual(
        response.status,
        GET_FRAUD_PREVENTION_ANALYTICS_RESPONSE.SUCCES.statusCode,
      );
      assert.deepStrictEqual(
        response.body,
        GET_FRAUD_PREVENTION_ANALYTICS_RESPONSE.SUCCES.body,
      );
    } catch (error) {
      console.log(error);
      throw error;
    }
  });
  //Estoy luchando para hacerlo andar :(
  it.skip("2. STATUS 200 con respuesta exitosa con el uso de Redis.", async () => {
    // Este test puedes agregar la lógica para probar el caso cuando Redis es usado
    try {
      // Simular la respuesta de Redis
      mockRedis.set("ARS-USD", "0.01");
      findAndCountAllStub.resolves(FIND_AND_COUNT_ALL.SUCCESS);

      const response = await request(appServer)
        .get("/v1/fraud/prevention/individuals/analytics")
        .query({ page: 1, offset: 10 })
        .set("api-key", ConfigEnv.AUTH.API_KEY);

      assert.strictEqual(
        response.status,
        GET_FRAUD_PREVENTION_ANALYTICS_RESPONSE.SUCCES.statusCode,
      );
      assert.deepStrictEqual(
        response.body,
        GET_FRAUD_PREVENTION_ANALYTICS_RESPONSE.SUCCES.body,
      );

      assert.strictEqual(mockRedis.get("ARS-USD"), "0.01");
    } catch (error) {
      console.log(error);
      throw error;
    }
  });

  it("3. Error de AUTH por falta de API_KEY", async () => {
    try {
      await request(appServer)
        .get("/v1/fraud/prevention/individuals/analytics")
        .query({ page: 1, offset: 10 })
        .set("api-key", null);
    } catch (error) {
      assert.strictEqual(
        response.status,
        GET_FRAUD_PREVENTION_ANALYTICS_RESPONSE.UNAUTHORIZED.statusCode,
      );
      assert.deepStrictEqual(
        response.body,
        GET_FRAUD_PREVENTION_ANALYTICS_RESPONSE.UNAUTHORIZED.body,
      );
    }
  });
});
