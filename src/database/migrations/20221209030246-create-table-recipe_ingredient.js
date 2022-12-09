'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('recipe_ingredient', {
      amount: {
        allowNull: false,
        type: Sequelize.DOUBLE,
      },
      ingredient_id: {
        allowNull: false,
        references: {
          model: 'ingredient',
          key: 'id',
        },
        type: Sequelize.INTEGER,
      },
      unit_id: {
        allowNull: true,
        references: {
          model: 'unit',
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
    await queryInterface.dropTable('recipe_ingredient');
  },
};
