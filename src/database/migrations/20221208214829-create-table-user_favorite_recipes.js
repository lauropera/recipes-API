'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user_favorite_recipes', {
      user_id: {
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
        type: Sequelize.INTEGER,
      },
      recipe_id: {
        allowNull: false,
        references: {
          model: 'recipes',
          key: 'id',
        },
        type: Sequelize.INTEGER,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('user_favorite_recipes');
  },
};
