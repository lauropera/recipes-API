import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { RecipeService } from '../services';

class RecipeController {
  private _service: RecipeService;

  constructor() {
    this._service = new RecipeService();

    this.listAll = this.listAll.bind(this);
  }

  async listAll(req: Request, res: Response): Promise<void> {
    const recipes = await this._service.getAll();
    res.status(StatusCodes.OK).json(recipes);
  }
}

export default RecipeController;
