import { STRING, INTEGER, Model } from 'sequelize';
import db from '.';

interface IUnit {
  id: number;
  name: string;
}

class Unit extends Model<IUnit> {
  declare id: number;
  declare name: string;
}

Unit.init(
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
    tableName: 'units',
    modelName: 'unit',
  },
);

export default Unit;
export { IUnit };
