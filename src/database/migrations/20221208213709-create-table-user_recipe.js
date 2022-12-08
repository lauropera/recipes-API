'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user_recipe', {
      user_id: {
        allowNull: false,
        references: {
          model: 'user',
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

  async down(queryInterface) {
    await queryInterface.dropTable('user_recipe');
  },
};
