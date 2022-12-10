import { StatusCodes } from 'http-status-codes';
import HttpException from '../utils/HttpException';
import Category, { ICategory } from '../database/models/Category';

class CategoryService {
  private _repository = Category;

  async getCategoryId(name: string | undefined): Promise<number> {
    const categoryName = name?.toLowerCase();

    const category = await this._repository.findOne({
      where: { name: categoryName },
    });

    if (!category) {
      throw new HttpException(StatusCodes.NOT_FOUND, 'Category not found');
    }

    return category.dataValues.id;
  }

  async getAll(): Promise<ICategory[]> {
    const categories = await this._repository.findAll();
    return categories;
  }
}

export default CategoryService;
