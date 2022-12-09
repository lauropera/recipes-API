'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('recipe', [
      {
        name: 'Bolo de cenoura',
        preparation_time: 40,
        servings: 8,
        video_url: '',
        image_url:
          'https://img.itdg.com.br/tdg/images/recipes/000/000/023/323619/323619_original.jpg',
        vegan: false,
        vegetarian: false,
      },
      {
        name: 'Salmão ao champignon',
        preparation_time: 60,
        servings: 4,
        video_url: '',
        image_url:
          'https://img.itdg.com.br/tdg/images/recipes/000/000/111/55103/55103_original.jpg',
        vegan: false,
        vegetarian: false,
      },
      {
        name: 'Chocolate quente cremoso',
        preparation_time: 10,
        servings: 4,
        video_url: '',
        image_url:
          'https://img.itdg.com.br/tdg/images/recipes/000/130/871/321194/321194_original.jpg',
        vegan: false,
        vegetarian: true,
      },
      {
        name: 'Coxinha de frango',
        preparation_time: 180,
        servings: 50,
        video_url: '',
        image_url:
          'https://img.itdg.com.br/tdg/images/recipes/000/003/798/292408/292408_original.jpg',
        vegan: false,
        vegetarian: false,
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('recipe', null, {});
  },
};
