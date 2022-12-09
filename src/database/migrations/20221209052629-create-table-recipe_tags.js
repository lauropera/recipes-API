'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('recipe_tags', {
      recipe_id: {
        allowNull: false,
        references: {
          model: 'recipes',
          key: 'id',
        },
        type: Sequelize.INTEGER,
      },
      tag_id: {
        allowNull: false,
        references: {
          model: 'tags',
          key: 'id',
        },
        type: Sequelize.INTEGER,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('recipe_tags');
  },
};
