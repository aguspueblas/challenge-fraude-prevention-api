const moment = require("moment-timezone");
const FIND_AND_COUNT_ALL = {
  SUCCESS: {
    count: 2,
    rows: [
      {
        dataValues: {
          user_id: 1,
          country: "Argentina",
          createdAt: moment(),
          updatedAt: "2024-01-01T00:00:00.000Z",
          payments: [
            {
              dataValues: {
                user_id: 1,
                state: "RECHAZADO",
                local_currency: "ARS",
                amount: 100.0,
                createdAt: moment(),
                updatedAt: "2024-01-01T00:00:00.000Z",
              },
              _modelOptions: {
                isSequelizeModel: true,
                timestamps: true,
              },
              isNewRecord: false,
            },
            {
              dataValues: {
                user_id: 1,
                state: "ACREDITADO",
                local_currency: "USD",
                amount: 100.0,
                createdAt: moment().subtract(5, "day"),
                updatedAt: "2024-01-01T00:00:00.000Z",
              },
              _modelOptions: {
                isSequelizeModel: true,
                timestamps: true,
              },
              isNewRecord: false,
            },
          ],
        },
        isNewRecord: false,
        _modelOptions: {
          isSequelizeModel: true,
          timestamps: true,
        },
      },
      {
        dataValues: {
          user_id: 2,
          country: "Brasil",
          createdAt: "2024-01-02T00:00:00.000Z",
          updatedAt: "2024-01-02T00:00:00.000Z",
          payments: [
            {
              dataValues: {
                user_id: 2,
                state: "ACREDITADO",
                local_currency: "ARS",
                amount: 5,
                createdAt: moment().subtract(5, "day"),
                updatedAt: "2024-01-02T00:00:00.000Z",
              },
              _modelOptions: {
                isSequelizeModel: true,
                timestamps: true,
              },
              isNewRecord: false,
            },
          ],
        },
        isNewRecord: false,
        _modelOptions: {
          isSequelizeModel: true,
          timestamps: true,
        },
      },
    ],
  },

  ERROR: new Error("Error al consultar los usuarios y pagos"), // Simula un error de base de datos
};

module.exports = { FIND_AND_COUNT_ALL };
