import {
  AuthController,
  RecipeController,
  FavoriteRecipeController,
  CategoryController,
} from '../controllers';

const authController = new AuthController();

const recipeController = new RecipeController();

const favoriteRecipesController = new FavoriteRecipeController();

const categoryController = new CategoryController();

export {
  authController,
  recipeController,
  favoriteRecipesController,
  categoryController,
};
