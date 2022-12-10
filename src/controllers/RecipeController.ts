import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { RecipeService } from '../services';

class RecipeController {
  private _service: RecipeService;

  constructor() {
    this._service = new RecipeService();

    this.listAll = this.listAll.bind(this);
    this.listById = this.listById.bind(this);
  }

  async listAll(_req: Request, res: Response): Promise<void> {
    const recipes = await this._service.getAll();
    res.status(StatusCodes.OK).json(recipes);
  }

  async listById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const recipe = await this._service.getById(Number(id));
    res.status(StatusCodes.OK).json(recipe);
  }
}

export default RecipeController;
