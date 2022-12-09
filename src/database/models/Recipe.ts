import { STRING, DATE, INTEGER, Model } from 'sequelize';
import db from '.';

interface IRecipe {
  id: number;
  name: string;
  chefId: number;
  categoryId: number;
  preparationTime: number;
  servings: number;
  videoUrl: string;
  imageUrl: string;
  createdAt: Date;
}

type IRecipeCreation = Omit<IRecipe, 'id'>;

class Recipe extends Model<IRecipe, IRecipeCreation> {
  declare id: number;
  declare name: string;
  declare chefId: number;
  declare categoryId: number;
  declare preparationTime: number;
  declare servings: number;
  declare videoUrl: string;
  declare imageUrl: string;
  declare createdAt: Date;
}

Recipe.init(
  {
    id: {
      type: INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: STRING,
    chefId: INTEGER,
    categoryId: INTEGER,
    preparationTime: INTEGER,
    servings: INTEGER,
    videoUrl: STRING,
    imageUrl: STRING,
    createdAt: DATE,
  },
  {
    sequelize: db,
    underscored: true,
    tableName: 'recipes',
    modelName: 'recipe',
  },
);

export default Recipe;
export { IRecipe, IRecipeCreation };
