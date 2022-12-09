import { STRING, INTEGER, Model } from 'sequelize';
import db from '.';

interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
  roleId: number;
}

type IUserCreation = Omit<IUser, 'id | roleId'>;

type IUserReturned = Omit<IUser, 'password'>;

class User extends Model<IUser, IUserCreation> {
  declare id: number;
  declare name: string;
  declare email: string;
  declare password: string;
  declare roleId: number;
}

User.init(
  {
    id: {
      type: INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: STRING,
    email: STRING,
    password: STRING,
    roleId: INTEGER,
  },
  {
    sequelize: db,
    timestamps: false,
    underscored: true,
    tableName: 'users',
    modelName: 'user',
  },
);

export default User;
export { IUser, IUserCreation, IUserReturned };
