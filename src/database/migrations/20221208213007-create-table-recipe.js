'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('recipe', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      preparation_time: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      servings: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      video_url: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      image_url: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      vegan: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
      vegetarian: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('recipe');
  },
};
