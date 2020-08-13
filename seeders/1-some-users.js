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
          address: "oud-Loosdrechtsedijk 148 1231NE Loosdrecht",
          dateOfBirth: "1996-08-23",
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
          address: "24 Ocean Village close 7441 Table View",
          dateOfBirth: "1996-08-06",
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
          address: "46 Almelo Drive 2271AD Almelo",
          dateOfBirth: "1993-08-24",
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
