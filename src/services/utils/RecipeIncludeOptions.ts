import Category from '../../database/models/Category';
import Ingredient from '../../database/models/Ingredient';
import RecipeIngredient from '../../database/models/RecipeIngredient';
import RecipeStep from '../../database/models/RecipeStep';
import Unit from '../../database/models/Unit';
import User from '../../database/models/User';

const INCLUDE_OPTIONS = {
  include: [
    { model: User, as: 'chef', attributes: ['name'] },
    { model: Category, as: 'category', attributes: ['name'] },
    {
      model: RecipeIngredient,
      as: 'ingredientsDetail',
      attributes: { exclude: ['ingredientId', 'unitId', 'recipeId'] },
      include: [
        { model: Ingredient, as: 'ingredient', attributes: ['name'] },
        { model: Unit, as: 'unit', attributes: { exclude: ['id'] } },
      ],
    },
    {
      model: RecipeStep,
      as: 'recipeSteps',
      attributes: ['stepNumber', 'instruction'],
    },
  ],
};

export default INCLUDE_OPTIONS;
