'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "orders", [
        {
          total: 300,
          userId: 2,
          expressShipping: true,
          completed: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          total: 960,
          userId: 3,
          expressShipping: false,
          completed: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      ]
      );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("orders", null, {});
  }
};
