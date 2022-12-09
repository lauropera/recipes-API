import { STRING, INTEGER, Model } from 'sequelize';
import db from '.';
import User from './User';

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
    tableName: 'roles',
    modelName: 'role',
  },
);

Role.hasMany(User, { foreignKey: 'role_id', as: 'users' });
User.hasOne(Role, { foreignKey: 'role_id', as: 'role' });

export default Role;
export { IRole };
