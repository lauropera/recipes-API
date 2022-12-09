import { ENUM, STRING, INTEGER, Model } from 'sequelize';
import db from '.';

type RoleType = 'user' | 'admin';

interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
  role: RoleType;
}

type IUserCreation = Omit<IUser, 'id'>;

type IUserReturned = Omit<IUser, 'password'>;

class User extends Model<IUser, IUserCreation> {
  declare id: number;
  declare name: string;
  declare email: string;
  declare password: string;
  declare role: RoleType;
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
    role: {
      type: ENUM('user', 'admin'),
      defaultValue: 'user',
    },
  },
  {
    sequelize: db,
    timestamps: false,
    underscored: true,
    tableName: 'users',
    modelName: 'user',
  }
);

export default User;
export { IUser, IUserCreation, IUserReturned };
