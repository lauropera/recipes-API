import {
  AuthController,
  RecipeController,
  FavoriteRecipeController,
} from '../controllers';

const authController = new AuthController();

const recipeController = new RecipeController();

const favoriteRecipesController = new FavoriteRecipeController();

export { authController, recipeController, favoriteRecipesController };
