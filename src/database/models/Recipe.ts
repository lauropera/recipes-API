import { STRING, DATE, INTEGER, Model } from 'sequelize';
import db from '.';
import RecipeTag from './RecipeTag';
import Tag from './Tag';
import RecipeStep from './RecipeStep';
import Category from './Category';
import User from './User';
import UserFavoriteRecipe from './UserFavoriteRecipe';
import Ingredient from './Ingredient';
import RecipeIngredient from './RecipeIngredient';
import Unit from './Unit';

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
    updatedAt: false,
    tableName: 'recipes',
    modelName: 'recipe',
  },
);

Recipe.belongsTo(User, { foreignKey: 'chefId', as: 'chef' });
User.hasMany(Recipe, { foreignKey: 'chefId', as: 'userRecipes' });

Recipe.hasOne(Category, { foreignKey: 'id', as: 'category' });
Category.hasMany(Recipe, { foreignKey: 'categoryId', as: 'recipes' });

Recipe.hasMany(RecipeStep, { foreignKey: 'recipeId', as: 'recipeSteps' });
RecipeStep.belongsTo(Recipe, { foreignKey: 'recipeId' });

Recipe.belongsToMany(Tag, { through: RecipeTag });
Tag.belongsToMany(Recipe, { through: RecipeTag });

Recipe.belongsToMany(User, {
  as: 'favoriteRecipes',
  through: UserFavoriteRecipe,
});

Recipe.belongsToMany(Ingredient, {
  through: RecipeIngredient,
});
Recipe.belongsToMany(Unit, {
  through: RecipeIngredient,
});

Recipe.hasMany(RecipeIngredient, { as: 'ingredientsDetails' });
RecipeIngredient.belongsTo(Recipe);

Ingredient.hasMany(RecipeIngredient, {
  sourceKey: 'id',
  foreignKey: 'ingredientId',
});
RecipeIngredient.hasOne(Ingredient, {
  sourceKey: 'ingredientId',
  foreignKey: 'id',
});

Unit.hasMany(RecipeIngredient, {
  foreignKey: 'unitId',
});
RecipeIngredient.hasOne(Unit, {
  sourceKey: 'unitId',
  foreignKey: 'id',
});

export default Recipe;
export { IRecipe, IRecipeCreation };
