'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('tags', [
      { name: 'Salmão' },
      { name: 'Chocolate quente' },
      { name: 'Vegetariana' },
      { name: 'Vegana' },
      { name: 'Rápida' },
      { name: 'Micro-ondas' },
      { name: 'Light' },
      { name: 'Com foto' },
      { name: 'Com vídeo' },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('tags', null, {});
  },
};
