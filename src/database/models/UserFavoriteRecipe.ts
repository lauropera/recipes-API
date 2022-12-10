import { INTEGER, Model } from 'sequelize';
import db from '.';

interface IUserFavoriteRecipe {
  userId: number;
  recipeId: number;
}

class UserFavoriteRecipe extends Model<IUserFavoriteRecipe> {
  declare userId: number;
  declare recipeId: number;
}

UserFavoriteRecipe.init(
  {
    userId: INTEGER,
    recipeId: INTEGER,
  },
  {
    sequelize: db,
    timestamps: false,
    underscored: true,
    tableName: 'user_favorite_recipes',
    modelName: 'user_favorite_recipe',
  },
);

export default UserFavoriteRecipe;
export { IUserFavoriteRecipe };
