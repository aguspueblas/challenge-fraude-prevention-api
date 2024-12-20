"use strict";
const moment = require("moment-timezone");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Fecha actual
    const now = moment();
    const sevenDaysAgo = moment().subtract(8, "days").toDate(); // 7 días atrás
    await queryInterface.bulkInsert("Users", [
      {
        country: "Argentina",
        createdAt: now.toDate(), // Agregar createdAt
        updatedAt: now.toDate(),
      },
      {
        country: "España",
        createdAt: now.toDate(), // Agregar createdAt
        updatedAt: now.toDate(),
      },
      {
        country: "Brazil",
        createdAt: now.toDate(),
        updatedAt: now.toDate(),
      },
      {
        country: "Brazil",
        createdAt: now.toDate(),
        updatedAt: now.toDate(),
      },
      {
        country: "Argentina",
        createdAt: sevenDaysAgo,
        updatedAt: now.toDate(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
