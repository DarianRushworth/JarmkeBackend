'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "userFavorites", [
        {
          productId: 8,
          userId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          productId: 6,
          userId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          productId: 14,
          userId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          productId: 2,
          userId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          productId: 10,
          userId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("userFavorites", null, {});
  }
};
