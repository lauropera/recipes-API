import { StatusCodes } from 'http-status-codes';
import HttpException from '../utils/HttpException';

import INewRecipe from '../interfaces/INewRecipe';
import schemaValidator from './utils/validations/schemaValidator';
import { RecipeSchema } from './utils/validations/schemas';
import { IAllIngredients } from '../interfaces/IValuesList';

import User from '../database/models/User';
import Unit from '../database/models/Unit';
import Category from '../database/models/Category';
import Ingredient from '../database/models/Ingredient';
import RecipeStep from '../database/models/RecipeStep';
import Recipe, { IRecipe } from '../database/models/Recipe';
import RecipeIngredient from '../database/models/RecipeIngredient';

import UnitService from './UnitService';
import IngredientService from './IngredientService';
import CategoryService from './CategoryService';

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

class RecipeService {
  private _repository = Recipe;
  private _userRepository = User;
  private _ingredientRepository = Ingredient;
  private _recipeIngredientRepository = RecipeIngredient;
  private _recipeSteps = RecipeStep;

  private _unitService: UnitService;
  private _ingredientService: IngredientService;
  private _categoryService: CategoryService;

  constructor() {
    this._unitService = new UnitService();
    this._ingredientService = new IngredientService();
    this._categoryService = new CategoryService();
  }

  async getAll(category: string | undefined): Promise<IRecipe[]> {
    let filter = {};

    if (category) {
      const categoryId = await this._categoryService.getCategoryId(category);
      filter = { categoryId };
    }

    const recipes = await this._repository.findAll({
      attributes: { exclude: ['chefId', 'categoryId'] },
      ...INCLUDE_OPTIONS,
      where: { ...filter },
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

  async create(recipeData: INewRecipe): Promise<void> {
    schemaValidator<INewRecipe>(
      recipeData,
      RecipeSchema,
      StatusCodes.BAD_REQUEST
    );

    const recipeChef = await this._userRepository.findOne({
      where: { email: recipeData.chef },
    });

    if (!recipeChef) {
      throw new HttpException(StatusCodes.NOT_FOUND, 'Chef not found');
    }

    const chefId = recipeChef.dataValues.id;
    const categoryId = await this._categoryService.getCategoryId(
      recipeData.category
    );

    const ingredientsData = await this._ingredientService.getRecipeIngredients(
      recipeData.ingredients
    );

    try {
      const newRecipe = await this._repository.create({
        name: recipeData.name,
        preparationTime: recipeData.preparationTime,
        servings: recipeData.servings,
        videoUrl: recipeData.videoUrl,
        imageUrl: recipeData.imageUrl,
        chefId,
        categoryId,
      });

      const recipeId = newRecipe.dataValues.id;

      const allSteps = recipeData.instructions.map((instruction, index) => ({
        stepNumber: index + 1,
        recipeId,
        instruction,
      }));

      const allIngredients: IAllIngredients[] = [];

      const { newIngredients, ingredientsFound } = ingredientsData;
      if (newIngredients.length > 0) {
        const insertNewIngredients = newIngredients.map(async (ingredient) => {
          const newIngredient = await this._ingredientRepository
            .create({ name: ingredient.name })
            .then((data) => ({
              ...ingredient,
              ingredientId: data.dataValues.id,
              recipeId,
            }));

          allIngredients.push(newIngredient);
        });
        await Promise.all(insertNewIngredients);
      }

      ingredientsFound.forEach((ingredient) => {
        allIngredients.push({ ...ingredient, recipeId });
      });

      const recipeIngredients = await this._unitService.formatUnitToId(
        allIngredients
      );


      await this._recipeSteps.bulkCreate(allSteps);
      await this._recipeIngredientRepository.bulkCreate(recipeIngredients);
    } catch (err) {
      throw new HttpException(
        StatusCodes.BAD_REQUEST,
        'Error adding a new recipe'
      );
    }
  }
}

export default RecipeService;
