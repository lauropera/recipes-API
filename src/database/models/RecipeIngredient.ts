import { DOUBLE, INTEGER, Model } from 'sequelize';
import db from '.';
import Ingredient from './Ingredient';
import Unit from './Unit';

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
    amount: DOUBLE,
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

Ingredient.belongsTo(RecipeIngredient, { foreignKey: 'ingredient_id' });
RecipeIngredient.hasMany(Ingredient, {
  foreignKey: 'ingredient_id',
  as: 'ingredients',
});

Unit.belongsTo(RecipeIngredient, { foreignKey: 'unit_id' });
RecipeIngredient.hasMany(Unit, { foreignKey: 'unit_id', as: 'units' });

export default RecipeIngredient;
export { IRecipeIngredient, IRecipeIngredientCreation };
