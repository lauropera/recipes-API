import { StatusCodes } from 'http-status-codes';
import HttpException from '../utils/HttpException';
import Category from '../database/models/Category';
import User from '../database/models/User';
import Recipe, { IRecipe } from '../database/models/Recipe';
import RecipeStep from '../database/models/RecipeStep';
import Tag from '../database/models/Tag';
import Ingredient from '../database/models/Ingredient';
import Unit from '../database/models/Unit';
import RecipeIngredient from '../database/models/RecipeIngredient';

const INCLUDE_OPTIONS = {
  include: [
    { model: User, as: 'chef', attributes: ['name'] },
    { model: Category, as: 'category', attributes: ['name'] },
    {
      model: Tag,
      as: 'tags',
      attributes: ['name'],
      through: { attributes: [] },
    },
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

class RecipeService {
  private _repository = Recipe;

  async getAll(): Promise<IRecipe[]> {
    const recipes = await this._repository.findAll({
      attributes: { exclude: ['chefId', 'categoryId'] },
      ...INCLUDE_OPTIONS,
    });
    return recipes;
  }

  async getById(id: number): Promise<IRecipe> {
    const recipe = await this._repository.findByPk(id, { ...INCLUDE_OPTIONS });

    if (!recipe) {
      throw new HttpException(StatusCodes.NOT_FOUND, 'Recipe not found');
    }

    return recipe;
  }
}

export default RecipeService;
