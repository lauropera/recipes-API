import { STRING, DATE, INTEGER, Model } from 'sequelize';
import db from '.';
import Ingredient from './Ingredient';
import RecipeTag from './RecipeTag';
import RecipeIngredient from './RecipeIngredient';
import Tag from './Tag';
import RecipeStep from './RecipeStep';
import Category from './Category';
import User from './User';
import UserFavoriteRecipe from './UserFavoriteRecipe';

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

Recipe.belongsTo(User, { foreignKey: 'chef_id', as: 'chef' });
User.hasMany(Recipe, { foreignKey: 'chef_id', as: 'recipes' });

Recipe.hasOne(Category, { foreignKey: 'category_id', as: 'category' });
Category.hasMany(Recipe, { foreignKey: 'category_id', as: 'recipes' });

Recipe.hasMany(RecipeStep, { foreignKey: 'recipe_id', as: 'recipeSteps' });
RecipeStep.belongsTo(Recipe, { foreignKey: 'recipe_id' });

Recipe.belongsToMany(Tag, {
  as: 'tags',
  foreignKey: 'recipe_id',
  otherKey: 'tag_id',
  through: RecipeTag,
});
Tag.belongsToMany(Recipe, {
  as: 'recipes',
  foreignKey: 'recipe_id',
  otherKey: 'tag_id',
  through: RecipeTag,
});

Recipe.belongsToMany(Ingredient, {
  as: 'ingredients',
  foreignKey: 'recipe_id',
  otherKey: 'ingredient_id',
  through: RecipeIngredient,
});

Recipe.belongsToMany(User, {
  as: 'favoriteRecipes',
  foreignKey: 'recipe_id',
  otherKey: 'user_id',
  through: UserFavoriteRecipe,
});

export default Recipe;
export { IRecipe, IRecipeCreation };
