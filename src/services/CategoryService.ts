import { StatusCodes } from 'http-status-codes';
import HttpException from '../utils/HttpException';

import User from '../database/models/User';
import RecipeIngredient from '../database/models/RecipeIngredient';
import Ingredient from '../database/models/Ingredient';
import Unit from '../database/models/Unit';
import RecipeStep from '../database/models/RecipeStep';
import Recipe from '../database/models/Recipe';
import Category, { ICategory } from '../database/models/Category';

const INCLUDE_OPTIONS = {
  include: [
    {
      model: Recipe,
      as: 'recipes',
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
    },
  ],
};

class CategoryService {
  private _repository = Category;

  async getCategoryId(name: string | undefined): Promise<number> {
    const categoryName = name?.toLowerCase();

    const category = await this._repository.findOne({
      where: { name: categoryName },
    });

    if (!category) {
      throw new HttpException(StatusCodes.NOT_FOUND, 'Category not found');
    }

    return category.dataValues.id;
  }

  async getAll(): Promise<ICategory[]> {
    const categories = await this._repository.findAll();
    return categories.sort((a, b) => a.id - b.id);
  }

  async getWithRecipes(id: number): Promise<ICategory> {
    const categories = await this._repository.findByPk(id, {
      ...INCLUDE_OPTIONS,
    });

    if (!categories) {
      throw new HttpException(StatusCodes.NOT_FOUND, 'Category not found');
    }

    return categories;
  }
}

export default CategoryService;
