'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('category', [
      { name: 'Bolos e Tortas Doces' },
      { name: 'Carnes' },
      { name: 'Peixes e Frutos do Mar' },
      { name: 'Saladas, Molhos e Acompanhamentos' },
      { name: 'Massas' },
      { name: 'Bebidas' },
      { name: 'Doces e Sobremesas' },
      { name: 'Lanches' },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('category', null, {});
  },
};
