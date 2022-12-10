'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('units', [
      { unit_long: 'grama', unit_short: 'g' },
      { unit_long: 'kilograma', unit_short: 'kg' },
      { unit_long: 'mililitro', unit_short: 'ml' },
      { unit_long: 'litro', unit_short: 'l' },
      { unit_long: 'colher', unit_short: 'colher' },
      { unit_long: 'xícara', unit_short: 'xícara' },
      { unit_long: 'colher de sopa', unit_short: 'colher (sopa)' },
      { unit_long: 'colher de chá', unit_short: 'colher (chá)' },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('units', null, {});
  },
};
