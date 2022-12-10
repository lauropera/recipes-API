import { StatusCodes } from 'http-status-codes';
import { compareSync, hashSync } from 'bcryptjs';
import HttpException from '../utils/HttpException';
import User, { IUserCreation } from '../database/models/User';
import { LoginSchema, RegisterSchema } from './utils/validations/schemas';
import ILogin from '../interfaces/ILogin';
import schemaValidator from './utils/validations/schemaValidator';
import Token from './utils/token/TokenUtils';

class AuthService {
  private _repository = User;
  private _tokenUtils = Token;

  private async checkIfEmailExists(email: string): Promise<void> {
    const user = await this._repository.findOne({ where: { email } });
    if (user) {
      throw new HttpException(StatusCodes.CONFLICT, 'Email already exists');
    }
  }

  async register(credentials: IUserCreation): Promise<void> {
    schemaValidator<IUserCreation>(
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

  async login(credentials: ILogin): Promise<string> {
    schemaValidator<ILogin>(credentials, LoginSchema, StatusCodes.BAD_REQUEST);

    const { email, password } = credentials;

    const user = await this._repository.findOne({ where: { email } });

    if (!user) {
      throw new HttpException(StatusCodes.NOT_FOUND, 'User not found');
    }

    const passwordValidation = compareSync(password, user.password);

    if (!passwordValidation) {
      throw new HttpException(
        StatusCodes.UNAUTHORIZED,
        'Email or password is incorrect',
      );
    }

    const token = this._tokenUtils.generate(user);
    return token;
  }

  async getUserRole(email: string): Promise<string> {
    const user = await this._repository.findOne({ where: { email } });

    if (!user) {
      throw new HttpException(StatusCodes.NOT_FOUND, 'User not found');
    }

    return user.role;
  }
}

export default AuthService;
