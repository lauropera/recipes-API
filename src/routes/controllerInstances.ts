import {
  AuthController,
  RecipeController,
  CategoryController,
} from '../controllers';

const authController = new AuthController();

const recipeController = new RecipeController();

const categoryController = new CategoryController();

export { authController, recipeController, categoryController };
