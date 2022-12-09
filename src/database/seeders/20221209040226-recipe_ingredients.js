'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('recipe_ingredients', [
      {
        amount: 0.5,
        ingredient_id: 1,
        unit_id: 6,
        recipe_id: 1,
      },
      {
        amount: 3,
        ingredient_id: 2,
        recipe_id: 1,
      },
      {
        amount: 4,
        ingredient_id: 3,
        recipe_id: 1,
      },
      {
        amount: 2,
        ingredient_id: 4,
        unit_id: 6,
        recipe_id: 1,
      },
      {
        amount: 2.5,
        ingredient_id: 5,
        unit_id: 6,
        recipe_id: 1,
      },
      {
        amount: 1,
        ingredient_id: 6,
        unit_id: 7,
        recipe_id: 1,
      },
      {
        amount: 1,
        ingredient_id: 7,
        unit_id: 7,
        recipe_id: 1,
      },
      {
        amount: 3,
        ingredient_id: 8,
        unit_id: 7,
        recipe_id: 1,
      },
      {
        amount: 1,
        ingredient_id: 4,
        unit_id: 6,
        recipe_id: 1,
      },
      {
        amount: 1,
        ingredient_id: 9,
        unit_id: 6,
        recipe_id: 1,
      },
      {
        amount: 2,
        ingredient_id: 10,
        recipe_id: 2,
      },
      {
        amount: 1,
        ingredient_id: 11,
        recipe_id: 2,
      },
      {
        amount: 3,
        ingredient_id: 12,
        recipe_id: 2,
      },
      {
        amount: 1,
        ingredient_id: 13,
        recipe_id: 2,
      },
      {
        amount: 1,
        ingredient_id: 14,
        recipe_id: 2,
      },
      {
        amount: 1,
        ingredient_id: 7,
        unit_id: 5,
        recipe_id: 2,
      },
      {
        amount: 1,
        ingredient_id: 15,
        recipe_id: 2,
      },
      {
        amount: 1,
        ingredient_id: 16,
        unit_id: 6,
        recipe_id: 2,
      },
      {
        amount: 1,
        ingredient_id: 17,
        recipe_id: 2,
      },
      {
        amount: 2,
        ingredient_id: 9,
        unit_id: 6,
        recipe_id: 3,
      },
      {
        amount: 1,
        ingredient_id: 18,
        unit_id: 7,
        recipe_id: 3,
      },
      {
        amount: 3,
        ingredient_id: 8,
        unit_id: 7,
        recipe_id: 3,
      },
      {
        amount: 4,
        ingredient_id: 4,
        unit_id: 7,
        recipe_id: 3,
      },
      {
        amount: 1,
        ingredient_id: 19,
        recipe_id: 3,
      },
      {
        amount: 1,
        ingredient_id: 20,
        recipe_id: 3,
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('recipe_ingredients', null, {});
  },
};
