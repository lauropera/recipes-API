'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('unit', [
      { name: 'Grama', abbreviation: 'g' },
      { name: 'Kilograma', abbreviation: 'kg' },
      { name: 'Mililitro', abbreviation: 'ml' },
      { name: 'Litro', abbreviation: 'l' },
      { name: 'Colher', abbreviation: 'sp' },
      { name: 'Xícara', abbreviation: 'cup' },
      { name: 'Colher de sopa', abbreviation: 'tbsp' },
      { name: 'Colher de chá', abbreviation: 'tsp' },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('unit', null, {});
  },
};
