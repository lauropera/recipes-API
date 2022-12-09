import { STRING, INTEGER, Model } from 'sequelize';
import db from '.';

interface ITag {
  id: number;
  name: string;
}

type ITagCreation = Omit<ITag, 'id'>;

class Tag extends Model<ITag, ITagCreation> {
  declare id: number;
  declare name: string;
}

Tag.init(
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
    tableName: 'tags',
    modelName: 'tag',
  },
);

export default Tag;
export { ITag, ITagCreation };
