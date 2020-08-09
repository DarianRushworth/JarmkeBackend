'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "userFavorites", [
        {
          id: 1,
          productId: 8,
          userId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          productId: 6,
          userId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 3,
          productId: 14,
          userId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 4,
          productId: 2,
          userId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 5,
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
