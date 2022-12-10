import { StatusCodes } from 'http-status-codes';
import HttpException from '../utils/HttpException';
import Category from '../database/models/Category';

class CategoryService {
  private _repository = Category;

  async getCategoryId(name: string): Promise<number> {
    const category = await this._repository.findOne({
      where: { name },
    });

    if (!category) {
      throw new HttpException(StatusCodes.NOT_FOUND, 'Category not found');
    }

    return category.dataValues.id;
  }
}

export default CategoryService;
