'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('recipe_ingredients', {
      amount: {
        allowNull: false,
        type: Sequelize.DOUBLE,
      },
      ingredient_id: {
        allowNull: false,
        references: {
          model: 'ingredients',
          key: 'id',
        },
        type: Sequelize.INTEGER,
      },
      unit_id: {
        allowNull: true,
        references: {
          model: 'units',
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
    await queryInterface.dropTable('recipe_ingredients');
  },
};
