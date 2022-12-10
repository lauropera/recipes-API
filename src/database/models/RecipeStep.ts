import { STRING, INTEGER, Model } from 'sequelize';
import db from '.';

interface IRecipeStep {
  id: number;
  stepNumber: number;
  recipeId: number;
  instruction: string;
}

type IRecipeStepCreation = Omit<IRecipeStep, 'id'>;

class RecipeStep extends Model<IRecipeStep, IRecipeStepCreation> {
  declare id: number;
  declare stepNumber: number;
  declare recipeId: number;
  declare instruction: string;
}

RecipeStep.init(
  {
    id: {
      type: INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    stepNumber: INTEGER,
    recipeId: INTEGER,
    instruction: STRING,
  },
  {
    sequelize: db,
    timestamps: false,
    underscored: true,
    tableName: 'recipe_steps',
    modelName: 'recipe_step',
  },
);

export default RecipeStep;
export { IRecipeStep, IRecipeStepCreation };
