'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "categories", [
        {
          name: "Necklaces",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Earrings",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Bracelets/Bangles",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Rings",
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("categories", null, {});
  }
};
