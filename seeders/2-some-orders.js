'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "orders", [
        {
          total: 300,
          userId: 2,
          productAmount: 2,
          expressShipping: true,
          shippingAddress: "User Address",
          completed: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          total: 960,
          userId: 3,
          productAmount: 3,
          expressShipping: false,
          shippingAddress: "User Address",
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
