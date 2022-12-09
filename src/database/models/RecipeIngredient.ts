import { INTEGER, Model } from 'sequelize';
import db from '.';

interface IRecipeIngredient {
  amount: number;
  ingredientId: number;
  unitId: number;
  recipeId: number;
}

type IRecipeIngredientCreation = Omit<IRecipeIngredient, 'id'>;

class RecipeIngredient extends Model<
IRecipeIngredient,
IRecipeIngredientCreation
> {
  declare amount: number;
  declare ingredientId: number;
  declare unitId: number;
  declare recipeId: number;
}

RecipeIngredient.init(
  {
    amount: INTEGER,
    ingredientId: INTEGER,
    unitId: INTEGER,
    recipeId: INTEGER,
  },
  {
    sequelize: db,
    timestamps: false,
    underscored: true,
    tableName: 'recipe_ingredients',
    modelName: 'recipe_ingredient',
  },
);

export default RecipeIngredient;
export { IRecipeIngredient, IRecipeIngredientCreation };
