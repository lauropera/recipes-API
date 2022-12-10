'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('users', [
      {
        name: 'Mallu Magalhães',
        email: 'mallu@artist.com',
        password:
          '$2a$08$1cg8tH8gaoXr77hMTkb/SOS/ixfvwRJV93dVdAk6Z/c5UMjmD2wyq',
      },
      {
        name: 'Sebastian',
        email: 'sebastian@sebs.com',
        password:
          '$2a$08$mjEvVqV72LHMKTlTZXlBS.C74b8Uq6uRvPgGu5k5.xQ6koVzeontO',
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('users', null, {});
  },
};
