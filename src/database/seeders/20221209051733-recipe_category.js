'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('recipe_category', [
      {
        recipe_id: 1,
        category_id: 1,
      },
      {
        recipe_id: 2,
        category_id: 2,
      },
      {
        recipe_id: 3,
        category_id: 3,
      },
      {
        recipe_id: 4,
        category_id: 4,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('recipe_category', null, {});
  },
};
