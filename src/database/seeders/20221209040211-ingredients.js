'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('ingredients', [
      { name: 'Óleo' },
      { name: 'Cenouras médias raladas' },
      { name: 'Ovos' },
      { name: 'Açúcar' },
      { name: 'Farinha de trigo' },
      { name: 'Fermento em pó' },
      { name: 'Manteiga' },
      { name: 'Chocolate em pó' },
      { name: 'Leite' },
      { name: 'Postas de salmão' },
      { name: 'Sal a gosto' },
      { name: 'Dentes de alho picados e amassados' },
      { name: 'Pimenta do reino a gosto' },
      { name: 'Suco de 1 limão' },
      { name: 'Vidro pequeno de cogumelos em fatias' },
      { name: 'Creme de leite' },
      { name: 'Sal e pimenta do reino branca a gosto' },
      { name: 'Amido de milho' },
      { name: 'Canela em pau' },
      { name: 'Caixinha de creme de leite' },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('ingredients', null, {});
  },
};
