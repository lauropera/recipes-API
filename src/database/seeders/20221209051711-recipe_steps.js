'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('recipe_steps', []);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('recipe_steps', null, {});
  },
};
