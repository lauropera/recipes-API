import { INTEGER, Model } from 'sequelize';
import db from '.';

interface IRecipeTag {
  recipeId: number;
  tagId: number;
}

class RecipeTag extends Model<IRecipeTag> {
  declare recipeId: number;
  declare tagId: number;
}

RecipeTag.init(
  {
    recipeId: INTEGER,
    tagId: INTEGER,
  },
  {
    sequelize: db,
    timestamps: false,
    underscored: true,
    tableName: 'recipe_tags',
    modelName: 'recipe_tag',
  },
);

export default RecipeTag;
export { IRecipeTag };
