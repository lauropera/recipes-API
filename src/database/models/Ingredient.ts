import { STRING, INTEGER, Model } from 'sequelize';
import db from '.';

interface IIngredient {
  id: number;
  name: string;
}

type IIngredientCreation = Omit<IIngredient, 'id'>;

class Ingredient extends Model<IIngredient, IIngredientCreation> {
  declare id: number;
  declare name: string;
}

Ingredient.init(
  {
    id: {
      type: INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: STRING,
  },
  {
    sequelize: db,
  },
);

export default Ingredient;
export { IIngredient, IIngredientCreation };
