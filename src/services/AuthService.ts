import User, { IUser, IUserCreation } from '../database/models/User';
import ILogin from '../interfaces/ILogin';
import Token from './utils/token/TokenUtils';

class AuthService {
  private _repository: User;

  async register(credentials: IUserCreation): Promise<void> {}
  async login(credentials: ILogin): Promise<string> {}
  async getUser(authToken: string): Promise<IUser> {}
}

export default AuthService;
