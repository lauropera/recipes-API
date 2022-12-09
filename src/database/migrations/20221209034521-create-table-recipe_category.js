'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('recipe_category', {
      recipe_id: {
        allowNull: false,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      },
      category_id: {
        allowNull: false,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      },
    });
  },

  async down (queryInterface) {
    await queryInterface.dropTable('recipe_category');
  }
};
