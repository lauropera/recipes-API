import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import FavoriteRecipeService from '../services/FavoriteRecipeService';

class FavoriteRecipeController {
  private _service: FavoriteRecipeService;

  constructor() {
    this._service = new FavoriteRecipeService();

    this.add = this.add.bind(this);
    this.remove = this.remove.bind(this);
    this.listFavorites = this.listFavorites.bind(this);
  }

  async add(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const {
      data: { email },
    } = res.locals.user;

    await this._service.addToFavorites(Number(id), email);
    res
      .status(StatusCodes.OK)
      .json({ message: 'Recipe has been favorited' });
  }

  async remove(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const {
      data: { email },
    } = res.locals.user;

    await this._service.removeFromFavorites(Number(id), email);
    res
      .status(StatusCodes.OK)
      .json({ message: 'Recipe has been unfavorited' });
  }

  async listFavorites(_req: Request, res: Response): Promise<void> {
    const {
      data: { email },
    } = res.locals.user;

    const recipes = await this._service.getFavorites(email);

    res.status(StatusCodes.OK).json(recipes);
  }
}

export default FavoriteRecipeController;
