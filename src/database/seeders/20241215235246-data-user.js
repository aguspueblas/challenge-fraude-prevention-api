'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        country: 'Argentina',
        createdAt: new Date(), // Agregar createdAt
        updatedAt: new Date(),
      },
      {
        country: 'España',
        createdAt: new Date(), // Agregar createdAt
        updatedAt: new Date(),
      },
      {
        country: 'Brazil',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
