/* eslint-disable max-lines-per-function */
import { StatusCodes } from 'http-status-codes';
import RecipeTag from '../database/models/RecipeTag';
import HttpException from '../utils/HttpException';
import db from '../database/models';
import Category from '../database/models/Category';
import User from '../database/models/User';
import Recipe, { IRecipe } from '../database/models/Recipe';
import RecipeStep from '../database/models/RecipeStep';
import Tag from '../database/models/Tag';
import Ingredient from '../database/models/Ingredient';
import Unit from '../database/models/Unit';
import RecipeIngredient from '../database/models/RecipeIngredient';
import INewRecipe, { IngredientDetail } from '../interfaces/INewRecipe';
import AuthService from './AuthService';
import schemaValidator from './utils/validations/schemaValidator';
import { RecipeSchema } from './utils/validations/schemas';
import {
  IIngredientFound,
  IIngredientsList,
  INewIngredient,
  ITagsList,
  nameType,
  newRecipeIngredient,
} from '../interfaces/IValuesList';

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
  private _userRepository = User;
  private _categoryRepository = Category;
  private _tagRepository = Tag;
  private _ingredientRepository = Ingredient;
  private _unitRepository = Unit;
  private _recipeTagIngredient = RecipeIngredient;
  private _recipeTagRepository = RecipeTag;

  constructor(private _authService = new AuthService()) {}

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

  private async validateCategory(name: string): Promise<number> {
    const category = await this._categoryRepository.findOne({
      where: { name },
    });

    if (!category) {
      throw new HttpException(StatusCodes.NOT_FOUND, 'Category not found');
    }

    return category.dataValues.id;
  }

  private async validateUserRole(userEmail: string): Promise<void> {
    const userRole = await this._authService.getUserRole(userEmail);

    if (userRole !== 'admin') {
      throw new HttpException(401, 'User not allowed');
    }
  }

  private async getTags(tags: string[]): Promise<ITagsList> {
    const tagsFound: number[] = [];
    const newTags: nameType[] = [];

    const tagsList = tags.map(async (name) => {
      const tag = await this._tagRepository.findOne({ where: { name } });

      if (tag) {
        tagsFound.push(tag.dataValues.id);
      } else {
        newTags.push({ name });
      }
    });

    await Promise.all(tagsList);

    return { tagsFound, newTags };
  }

  private async validateUnit(name: string): Promise<void> {
    const unit = await this._unitRepository.findOne({
      where: { unitShort: name },
    });

    if (!unit) throw new HttpException(StatusCodes.NOT_FOUND, 'Invalid unit');
  }

  private async getIngredients(
    ingredients: IngredientDetail[],
  ): Promise<IIngredientsList> {
    const ingredientsFound: IIngredientFound[] = [];
    const newIngredients: INewIngredient[] = [];

    const ingredientsList = ingredients.map(async ({ name, unit, amount }) => {
      await this.validateUnit(unit);

      const ingredient = await this._ingredientRepository.findOne({
        where: { name },
      });

      if (ingredient) {
        return ingredientsFound.push({
          ingredientId: ingredient.dataValues.id,
          amount,
          unit,
        });
      }

      if (!newIngredients.some((item) => item.name === name)) {
        newIngredients.push({
          amount,
          name,
          unit,
        });
      }
    });

    await Promise.all(ingredientsList);

    return { ingredientsFound, newIngredients };
  }

  private static formattedData(recipeData: INewRecipe): any {
    const recipe = {
      name: recipeData.name,
      preparationTime: recipeData.preparationTime,
      servings: recipeData.servings,
      videoUrl: recipeData.videoUrl,
      imageUrl: recipeData.imageUrl,
    };

    return { recipe };
  }

  async create(loggedUserEmail: string, recipeData: INewRecipe): Promise<any> {
    await this.validateUserRole(loggedUserEmail);

    schemaValidator<INewRecipe>(
      recipeData,
      RecipeSchema,
      StatusCodes.BAD_REQUEST,
    );

    const recipeChef = await this._userRepository.findOne({
      where: { email: recipeData.chef },
    });

    if (!recipeChef) {
      throw new HttpException(StatusCodes.NOT_FOUND, 'Chef not found');
    }

    const chefId = recipeChef.dataValues.id;
    const categoryId = await this.validateCategory(recipeData.category);

    const { tagsFound, newTags } = await this.getTags(recipeData.tags);

    const { ingredientsFound, newIngredients } = await this.getIngredients(
      recipeData.ingredients,
    );

    const { recipe } = RecipeService.formattedData(recipeData);

    const transaction = await db.transaction();
    try {
      const newRecipe = await this._repository.create(
        {
          ...recipe,
          chefId,
          categoryId,
        },
        { transaction },
      );

      const recipeId = newRecipe.dataValues.id;
      const tagsId = [...tagsFound];
      const ingredients = [...ingredientsFound];

      // if (newIngredients.length > 0) {
      //   const ingredientNames = newIngredients.map(({ name }) => ({ name }));

      //   const ingredientList = await this._ingredientRepository.bulkCreate(
      //     ingredientNames,
      //   );

      //   const data = ingredientList.map(({ amount, unit }) => ({
      //     unit, amount, ingredientId:
      //   }))

      //   ingredientList.forEach((i) => ingredients.push(i.dataValues));
      // }

      // const recipeIngredients = ingredientsId.map((ingredientId) => (
      //   {
      //     amount:
      //   }
      // ))
      // await this._recipeTagIngredient.bulkCreate()

      // if (newTags.length > 0) {
      //   const tagList = await this._tagRepository.bulkCreate(newTags);
      //   tagList.forEach((t) => tagsId.push(t.dataValues.id));
      // }

      // const recipeTags = tagsId.map((tagId) => ({ recipeId, tagId }));

      // const e = await this._recipeTagRepository.bulkCreate(recipeTags, {
      //   include: [Recipe, Tag],
      // });
      // await this._recipeTagRepository.create(recipeTags[0]);
    } catch (err) {
      throw new HttpException(
        StatusCodes.BAD_REQUEST,
        'Error adding a new recipe',
      );
    }
  }
}

export default RecipeService;
