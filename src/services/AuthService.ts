import { StatusCodes } from 'http-status-codes';
import { hashSync } from 'bcryptjs';
import HttpException from '../utils/HttpException';
import User, { IUser, IUserCreation } from '../database/models/User';
import ILogin from '../interfaces/ILogin';
import RegisterSchema from './utils/validations/schemas/schemas';
import validator from './utils/validations/validator';
import Token from './utils/token/TokenUtils';

class AuthService {
  private _repository = User;

  private async checkIfEmailExists(email: string): Promise<void> {
    const user = await this._repository.findOne({ where: { email } });
    if (user) {
      throw new HttpException(StatusCodes.CONFLICT, 'Email already exists');
    }
  }

  async register(credentials: IUserCreation): Promise<void> {
    validator<IUserCreation>(
      credentials,
      RegisterSchema,
      StatusCodes.BAD_REQUEST,
    );

    await this.checkIfEmailExists(credentials.email);

    const encryptedPassword = hashSync(credentials.password, 8);

    await this._repository.create({
      ...credentials,
      password: encryptedPassword,
    });
  }

  // async login(credentials: ILogin): Promise<string> {}

  // async getUser(authToken: string): Promise<IUser> {}
}

export default AuthService;
