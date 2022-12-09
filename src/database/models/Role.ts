import { STRING, INTEGER, Model } from 'sequelize';
import db from '.';

interface IRole {
  id: number;
  name: string;
}

class Role extends Model<IRole> {
  declare id: number;
  declare name: string;
}

Role.init(
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
    underscored: true,
    tableName: 'roles',
    modelName: 'role',
  },
);

export default Role;
export { IRole };
