"use strict";

const moment = require("moment-timezone");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const timezone = "America/Argentina/Buenos_Aires"; // Usamos la zona horaria de Argentina
    const now = moment().tz(timezone); // Fecha actual en la zona horaria especificada
    const oneDayAgo = moment().subtract(1, "days").startOf("day"); // Hace un día, al inicio del día
    const sevenDaysAgo = moment().subtract(7, "days").startOf("day"); // Hace 7 días, al inicio del día
    const fourteenDaysAgo = moment().subtract(14, "days").startOf("day"); // Hace 14 días, al inicio del día

    // Insertamos los pagos
    await queryInterface.bulkInsert("Payments", [
      // 10 PAGOS RECHAZADOS EN EL ÚLTIMO DÍA (divididos entre 5 clientes)
      ...Array.from({ length: 5 }).map((_, i) => ({
        user_id: i + 1, // Usuarios del 1 al 5
        state: "RECHAZADO",
        local_currency: "ARS",
        amount: 100 + Math.random() * 100, // Monto aleatorio entre 100 y 200
        createdAt: oneDayAgo.toDate(),
        updatedAt: oneDayAgo.toDate(),
      })),

      // 10 PAGOS ACREDITADOS EN EL ÚLTIMO DÍA (divididos entre 5 clientes)
      ...Array.from({ length: 5 }).map((_, i) => ({
        user_id: i + 1, // Usuarios del 1 al 5
        state: "ACREDITADO",
        local_currency: "USD",
        amount: 50 + Math.random() * 50, // Monto aleatorio entre 50 y 100
        createdAt: oneDayAgo.toDate(),
        updatedAt: oneDayAgo.toDate(),
      })),

      // 10 PAGOS ACREDITADOS EN LOS ÚLTIMOS 7 DÍAS CON LOCAL_CURRENCY ARS POR CLIENTE
      ...Array.from({ length: 5 }).map((_, i) => ({
        user_id: i + 1, // Usuarios del 1 al 5
        state: "ACREDITADO",
        local_currency: "ARS",
        amount: 150 + Math.random() * 100, // Monto aleatorio entre 150 y 250
        createdAt: sevenDaysAgo.toDate(),
        updatedAt: sevenDaysAgo.toDate(),
      })),

      // 10 PAGOS ACREDITADOS EN LOS ÚLTIMOS 7 DÍAS CON LOCAL_CURRENCY USD POR CLIENTE
      ...Array.from({ length: 5 }).map((_, i) => ({
        user_id: i + 1, // Usuarios del 1 al 5
        state: "ACREDITADO",
        local_currency: "USD",
        amount: 50 + Math.random() * 100, // Monto aleatorio entre 50 y 150
        createdAt: sevenDaysAgo.toDate(),
        updatedAt: sevenDaysAgo.toDate(),
      })),

      // 10 PAGOS ACREDITADOS EN LOS ÚLTIMOS 7 DÍAS CON LOCAL_CURRENCY EUR POR CLIENTE
      ...Array.from({ length: 5 }).map((_, i) => ({
        user_id: i + 1, // Usuarios del 1 al 5
        state: "ACREDITADO",
        local_currency: "EUR",
        amount: 50 + Math.random() * 100, // Monto aleatorio entre 50 y 150
        createdAt: sevenDaysAgo.toDate(),
        updatedAt: sevenDaysAgo.toDate(),
      })),

      // 10 PAGOS ACREDITADOS Y RECHAZADOS PASANDO LOS 7 DÍAS DESDE LA FECHA ACTUAL, MONEDA ARS O USD
      ...Array.from({ length: 5 })
        .map((_, i) => [
          {
            user_id: i + 1, // Usuarios del 1 al 5
            state: "ACREDITADO",
            local_currency: "ARS",
            amount: 200 + Math.random() * 100, // Monto aleatorio entre 200 y 300
            createdAt: fourteenDaysAgo.toDate(),
            updatedAt: fourteenDaysAgo.toDate(),
          },
          {
            user_id: i + 1, // Usuarios del 1 al 5
            state: "RECHAZADO",
            local_currency: "USD",
            amount: 100 + Math.random() * 50, // Monto aleatorio entre 100 y 150
            createdAt: fourteenDaysAgo.toDate(),
            updatedAt: fourteenDaysAgo.toDate(),
          },
          {
            user_id: i + 1, // Usuarios del 1 al 5
            state: "RECHAZADO",
            local_currency: "EUR",
            amount: 100 + Math.random() * 50, // Monto aleatorio entre 100 y 150
            createdAt: fourteenDaysAgo.toDate(),
            updatedAt: fourteenDaysAgo.toDate(),
          },
        ])
        .flat(),
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Payments", null, {});
  },
};
