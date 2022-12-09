'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('recipe_tag', [
      {
        recipe_id: 2,
        tag_id: 1,
      },
      {
        recipe_id: 3,
        tag_id: 2,
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('recipe_tag', null, {});
  },
};
