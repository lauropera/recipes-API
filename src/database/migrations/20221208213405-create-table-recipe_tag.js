'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('recipe_tag', {
      tag_id: {
        allowNull: false,
        references: {
          model: 'tag',
          key: 'id',
        },
        type: Sequelize.INTEGER,
      },
      recipe_id: {
        allowNull: false,
        references: {
          model: 'recipe',
          key: 'id',
        },
        type: Sequelize.INTEGER,
      },
    });
  },

  async down (queryInterface) {
    await queryInterface.dropTable('recipe_tag');
  }
};
