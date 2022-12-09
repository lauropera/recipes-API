'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('unit', [
      { name: 'grama', abbreviation: 'g' },
      { name: 'kilograma', abbreviation: 'kg' },
      { name: 'mililitro', abbreviation: 'ml' },
      { name: 'litro', abbreviation: 'l' },
      { name: 'colher', abbreviation: 'sp' },
      { name: 'xícara', abbreviation: 'cup' },
      { name: 'colher de sopa', abbreviation: 'tbsp' },
      { name: 'colher de chá', abbreviation: 'tsp' },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('unit', null, {});
  },
};
