'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('recipes', [
      {
        name: 'Bolo de cenoura',
        preparation_time: 40,
        servings: 8,
        chef_id: 1,
        category_id: 1,
        video_url: '',
        image_url:
          'https://img.itdg.com.br/tdg/images/recipes/000/000/023/323619/323619_original.jpg',
        created_at: Sequelize.fn('now'),
      },
      {
        name: 'Salmão ao champignon',
        preparation_time: 60,
        servings: 4,
        chef_id: 2,
        category_id: 2,
        video_url: '',
        image_url:
          'https://img.itdg.com.br/tdg/images/recipes/000/000/111/55103/55103_original.jpg',
        created_at: Sequelize.fn('now'),
      },
      {
        name: 'Chocolate quente cremoso',
        preparation_time: 10,
        servings: 4,
        chef_id: 1,
        category_id: 3,
        video_url: '',
        image_url:
          'https://img.itdg.com.br/tdg/images/recipes/000/130/871/321194/321194_original.jpg',
        created_at: Sequelize.fn('now'),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('recipes', null, {});
  },
};
