import { STRING, INTEGER, Model } from 'sequelize';
import db from '.';

interface ICategory {
  id: number;
  name: string;
}

type ICategoryCreation = Omit<ICategory, 'id'>;

class Category extends Model<ICategory, ICategoryCreation> {
  declare id: number;
  declare name: string;
}

Category.init(
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
    timestamps: false,
    tableName: 'categories',
    modelName: 'category',
  },
);

export default Category;
export { ICategory, ICategoryCreation };
