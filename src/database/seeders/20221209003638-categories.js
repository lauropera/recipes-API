'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('categories', [
      { name: 'Bolos e Tortas Doces' },
      { name: 'Peixes e Frutos do Mar' },
      { name: 'Bebidas' },
      { name: 'Carnes' },
      { name: 'Aves' },
      { name: 'Saladas, Molhos e Acompanhamentos' },
      { name: 'Sopas' },
      { name: 'Massas' },
      { name: 'Doces e Sobremesas' },
      { name: 'Lanches' },
      { name: 'Prato único' },
      { name: 'Light' },
      { name: 'Alimentação saúdavel' },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('categories', null, {});
  },
};
