import { STRING, INTEGER, Model } from 'sequelize';
import db from '.';

interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
}

type IUserCreation = Omit<IUser, 'id'>;

type IUserReturned = Omit<IUser, 'password'>;

class User extends Model<IUser, IUserCreation> {
  declare id: number;
  declare name: string;
  declare email: string;
  declare password: string;
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
  },
  {
    sequelize: db,
    timestamps: false,
    tableName: 'users',
    modelName: 'user',
  },
);

export default User;
export { IUser, IUserCreation, IUserReturned };
