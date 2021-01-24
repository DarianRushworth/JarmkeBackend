'use strict';
const bcrypt = require("bcrypt")
const { SALT_ROUNDS } = require("../config/constants")

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "users", [
        {
          firstName: "Kristina",
          lastName: "Matthews",
          email: "K.Jarmke@gmail.com",
          phone: "31655940045",
          address: "oud-Loosdrechtsedijk 148, 1231NE, Loosdrecht, Noord-Holland, Netherlands",
          dateOfBirth: "08-23-1996",
          isOwner: true,
          password: bcrypt.hashSync("KDog", SALT_ROUNDS),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Darian",
          lastName: "Rushworth",
          email: "darianerrolrushworth@gmail.com",
          phone: "31654950045",
          address: "Ocean Village close 24, 7441, Table View, Cape Town, South Africa",
          dateOfBirth: "08-06-1996",
          isOwner: false,
          password:  bcrypt.hashSync("DDog", SALT_ROUNDS),
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          firstName: "Kevin",
          lastName: "Merdjan",
          email: "kevinMerdge@gmail.com",
          phone: "3165782389",
          address: "Almelo Drive 46, 2271AD, Almelo, Noord-Holland, Netherlands",
          dateOfBirth: "08-24-1993",
          isOwner: false,
          password:  bcrypt.hashSync("KDogM", SALT_ROUNDS),
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ]
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("users", null, {});
  }
};
