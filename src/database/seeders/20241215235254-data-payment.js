"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Payments", [
      {
        user_id: 2,
        state: "ACREDITADO",
        local_currency: "ARG",
        amount: 102.1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 2,
        state: "RECHAZADO",
        local_currency: "ARG",
        amount: 102.1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 3,
        state: "PENDIENTE",
        local_currency: "ARG",
        amount: 102.1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 1,
        state: "ACREDITADO",
        local_currency: "ARG",
        amount: 102.1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
