'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('ingredient', [
      { name: 'Óleo' },
      { name: 'Cenoura média ralada' },
      { name: 'Ovo' },
      { name: 'Açúcar' },
      { name: 'Farinha de trigo' },
      { name: 'Fermento em pó' },
      { name: 'Manteiga' },
      { name: 'Chocolate em pó' },
      { name: 'Leite' },
      { name: 'Sal' },
      { name: 'Pimenta-do-reino' },
      { name: 'Azeite' },
      { name: 'Suco de 1 limão' },
      { name: 'Posta de salmão' },
      { name: 'Dente de alho' },
      { name: 'Vidro pequeno de cogumelos em fatias' },
      { name: 'Creme de leite' },
      { name: 'Amido de milho' },
      { name: 'Canela em pau' },
      { name: 'Caixinha de creme de leite' },
      { name: 'Água' },
      { name: 'Caldo de galinha' },
      { name: 'Margarina' },
      { name: 'Colorífico' },
      { name: 'Peito de frango cozido e desfiado' },
      { name: 'Cebola' },
      { name: 'Salsinha picada' },
      { name: 'Clara' },
      { name: 'Farinha de pão' },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('ingredient', null, {});
  },
};
