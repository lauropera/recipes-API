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
        type: Sequelize.STRING,
      },
      chef_id: {
        allowNull: false,
        references: {
          model: 'user',
          key: 'id',
        },
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
      created_at: {
        type: Sequelize.DATEONLY,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('recipe');
  },
};
