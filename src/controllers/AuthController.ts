import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { AuthService, RoleService } from '../services';

class AuthController {
  private _service: AuthService;
  private _roleService: RoleService;

  constructor() {
    this._service = new AuthService();
    this._roleService = new RoleService();

    this.register = this.register.bind(this);
    this.login = this.login.bind(this);
    this.listUser = this.listUser.bind(this);
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

  async listUser(_req: Request, res: Response): Promise<void> {
    const {
      data: { email },
    } = res.locals.user;

    const role = await this._roleService.getUserRole(email);
    res.status(StatusCodes.OK).json({ role });
  }
}

export default AuthController;
