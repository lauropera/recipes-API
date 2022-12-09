'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
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
      category_id: {
        allowNull: false,
        references: {
          model: 'category',
          key: 'id',
        },
        type: Sequelize.INTEGER,
      },
      youtube_link: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      thumbnail: {
        allowNull: true,
        type: Sequelize.STRING,
      },
    });
  },

  async down (queryInterface) {
    await queryInterface.dropTable('recipe');
  }
};
