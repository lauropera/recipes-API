'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('category', [
      { name: 'Bolos e Tortas Doces' },
      { name: 'Peixes e Frutos do Mar' },
      { name: 'Bebidas' },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('category', null, {});
  },
};
