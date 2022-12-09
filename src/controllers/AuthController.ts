import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { AuthService } from '../services';

class AuthController {
  private _service: AuthService;

  constructor() {
    this._service = new AuthService();

    this.register = this.register.bind(this);
    this.login = this.login.bind(this);
    // this.listUser = this.listUser.bind(this);
  }

  async register(req: Request, res: Response): Promise<void> {
    await this._service.register(req.body);
    res
      .status(StatusCodes.CREATED)
      .json({ message: 'Successful registration!' });
  }

  async login(req: Request, res: Response): Promise<void> {
    const token = await this._service.login(req.body);
    res.status(StatusCodes.OK).json({ token });
  }

  // async listUser(req: Request, res: Response): Promise<void> {
  //   const auth = req.headers.authorization;
  //   const user = await this._service.getUser(auth);
  //   res.status(StatusCodes.OK).json(user);
  // }
}

export default AuthController;
