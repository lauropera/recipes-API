import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import CategoryService from '../services/CategoryService';

class CategoryController {
  private _service: CategoryService;

  constructor() {
    this._service = new CategoryService();

    this.create = this.create.bind(this);
  }

  async create(req: Request, res: Response): Promise<void> {
    await this._service.create(req.body);
    res
      .status(StatusCodes.CREATED)
      .json({ message: 'Category has been successfully created' });
  }
}

export default CategoryController;
