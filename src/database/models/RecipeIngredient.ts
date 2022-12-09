import { DOUBLE, INTEGER, Model } from 'sequelize';
import db from '.';
import Ingredient from './Ingredient';
import Recipe from './Recipe';
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

Recipe.belongsToMany(Ingredient, {
  as: 'recipeIngredients',
  foreignKey: 'recipeId',
  otherKey: 'ingredientId',
  through: RecipeIngredient,
});

Ingredient.belongsTo(RecipeIngredient, { foreignKey: 'ingredientId' });
RecipeIngredient.hasMany(Ingredient, {
  foreignKey: 'ingredientId',
  as: 'ingredients',
});

Unit.belongsTo(RecipeIngredient, { foreignKey: 'unitId' });
RecipeIngredient.hasMany(Unit, { foreignKey: 'unitId', as: 'units' });

export default RecipeIngredient;
export { IRecipeIngredient, IRecipeIngredientCreation };
