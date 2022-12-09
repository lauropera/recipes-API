'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('tag', [
      { name: 'Salmão' },
      { name: 'Chocolate quente' },
      { name: 'Vegetariana' },
      { name: 'Vegana' },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('tag', null, {});
  },
};
