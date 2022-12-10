import { STRING, INTEGER, Model } from 'sequelize';
import db from '.';

interface IUnit {
  id: number;
  unitLong: string;
  unitShort: string;
}

class Unit extends Model<IUnit> {
  declare id: number;
  declare unitLong: string;
  declare unitShort: string;
}

Unit.init(
  {
    id: {
      type: INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    unitLong: STRING,
    unitShort: STRING,
  },
  {
    sequelize: db,
    timestamps: false,
    underscored: true,
    tableName: 'units',
    modelName: 'unit',
  },
);

export default Unit;
export { IUnit };
