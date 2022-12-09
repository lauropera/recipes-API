'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('recipe_steps', [
      {
        step_number: 1,
        recipe_id: 1,
        instruction:
          'Em um liquidificador, adicione a cenoura, os ovos e o óleo, depois misture.',
      },
      {
        step_number: 2,
        recipe_id: 1,
        instruction: 'Acrescente o açúcar e bata novamente por 5 minutos.',
      },
      {
        step_number: 3,
        recipe_id: 1,
        instruction:
          'Em uma tigela ou na batedeira, adicione a farinha de trigo e depois misture novamente.',
      },
      {
        step_number: 4,
        recipe_id: 1,
        instruction:
          'Acrescente o fermento e misture lentamente com uma colher.',
      },
      {
        step_number: 5,
        recipe_id: 1,
        instruction:
          'Asse em um forno preaquecido a 180° C por aproximadamente 40 minutos.',
      },
      {
        step_number: 6,
        recipe_id: 1,
        instruction:
          'Despeje em uma tigela a manteiga, o chocolate em pó, o açúcar e o leite, depois misture.',
      },
      {
        step_number: 7,
        recipe_id: 1,
        instruction:
          'Leve a mistura ao fogo e continue misturando até obter uma consistência cremosa, depois despeje a calda por cima do bolo.',
      },
      {
        step_number: 1,
        recipe_id: 2,
        instruction:
          'Tempere as postas de salmão com alho, sal, limão e pimenta. Deixe marinar por meia hora. Grelhe as postas de salmão até dourarem.',
      },
      {
        step_number: 2,
        recipe_id: 2,
        instruction:
          'Para o molho,derreta a manteiga, refogue os cogumelos. Acrescente o creme de leite e deixe engrossar.Tempere e colque sobre o salmão grelhado.',
      },
      {
        step_number: 1,
        recipe_id: 3,
        instruction:
          'Em um liquidificador, bata o leite, o amido de milho, o chocolate em pó e o açúcar.',
      },
      {
        step_number: 2,
        recipe_id: 3,
        instruction:
          'Despeje a mistura em uma panela com a canela e leve ao fogo baixo, mexendo sempre até ferver.',
      },
      {
        step_number: 3,
        recipe_id: 3,
        instruction:
          'Desligue, adicione o creme de leite e mexa bem até obter uma mistura homogênea.',
      },
      {
        step_number: 4,
        recipe_id: 3,
        instruction: 'Retire a canela e sirva quente.',
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('recipe_steps', null, {});
  },
};
