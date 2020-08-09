'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "orderProducts", [
        {
          id: 1,
          orderId: 1,
          productId: 13,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          orderId: 1,
          productId: 12,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 3,
          orderId: 2,
          productId: 7,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 4,
          orderId: 2,
          productId: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 5,
          orderId: 2,
          productId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("orderProducts", null, {});
  }
};
