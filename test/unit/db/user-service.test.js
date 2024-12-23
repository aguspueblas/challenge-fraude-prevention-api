"use strict";
const {
  describe,
  after,
  afterEach,
  it,
  beforeEach,
  test,
} = require("node:test");
const assert = require("node:assert/strict");
const UserService = require("../../../src/services/db/user.service");
const { FIND_AND_COUNT_ALL } = require("../../mock/db/user.response");
const sinon = require("sinon");
const { sequelize } = require("../../../src/database/models");
describe(`UNIT TEST: Servicio de conexion con el modelo USER.`, function () {
  let userService;
  let findAndCountAllStub;
  beforeEach(() => {
    userService = new UserService();
  });
  after(() => {});

  afterEach(() => {
    //Restaura todos los stubs desp de cada prueba.
    if (findAndCountAllStub) {
      findAndCountAllStub.restore();
    }
  });
  describe("PRUEBAS PARA: getUsersWithPaginationAndPaymentsBetweenDates():", () => {
    it("1. Respuesta OK", { only: true }, async () => {
      try {
        findAndCountAllStub = sinon.stub(
          sequelize.models.User,
          "findAndCountAll",
        );
        findAndCountAllStub.resolves(FIND_AND_COUNT_ALL.SUCCESS);
        const result =
          await userService.getUsersWithPaginationAndPaymentsBetweenDates(
            1,
            2,
            "ASC",
            "2024-01-01",
            "2024-01-01",
          );
        assert.strictEqual(result.users.length, 2); // 2 usuarios
        assert.strictEqual(result.pagination.total, 2); // Total 2 usuarios
        assert.strictEqual(result.pagination.totalPages, 1); // 1 página
        assert.strictEqual(result.pagination.currentPage, 1); // Página actual
        assert.strictEqual(result.pagination.perPage, 2); // 2 usuarios por página
      } catch (error) {
        console.error(error);
        throw error;
      }
    });

    it("2. Respuesta con ERROR.", async () => {
      try {
        findAndCountAllStub = sinon.stub(
          sequelize.models.User,
          "findAndCountAll",
        );
        findAndCountAllStub.rejects(FIND_AND_COUNT_ALL.ERROR);
        await userService.getUsersWithPaginationAndPaymentsBetweenDates(
          1,
          2,
          "ASC",
          "2024-01-01",
          "2024-01-01",
        );
      } catch (error) {
        assert.deepStrictEqual(
          error.message,
          "Error al consultar los usuarios y pagos",
        );
        console.error(error);
      }
    });
  });
});
