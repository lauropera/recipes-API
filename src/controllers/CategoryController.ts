import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { CategoryService } from '../services';

class CategoryController {
  private _service: CategoryService;

  constructor() {
    this._service = new CategoryService();

    this.listAll = this.listAll.bind(this);
  }

  async listAll(_req: Request, res: Response): Promise<void> {
    const categories = await this._service.getAll();
    res.status(StatusCodes.OK).json(categories);
  }
}

export default CategoryController;
