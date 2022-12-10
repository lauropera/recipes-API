import { IRecipeCreation } from '../database/models/Recipe';

type IngredientDetail = {
  amount: number;
  name: string;
  unit: string;
};

export default interface INewRecipe extends IRecipeCreation {
  chef: string;
  category: string;
  tags: string[];
  ingredients: IngredientDetail[];
  instructions: string[];
}
