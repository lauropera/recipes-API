import { StatusCodes } from 'http-status-codes';
import HttpException from '../utils/HttpException';
import Category from '../database/models/Category';
import schemaValidator from './utils/validations/schemaValidator';
import { CategorySchema } from './utils/validations/schemas';
import { NameType } from '../interfaces/NameType';

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

  async create(newCategory: NameType): Promise<void> {
    schemaValidator<NameType>(
      newCategory,
      CategorySchema,
      StatusCodes.BAD_REQUEST,
    );

    const category = await this._repository.findOne({
      where: { name: newCategory.name },
    });

    if (category) {
      throw new HttpException(StatusCodes.CONFLICT, 'Category already exists');
    }

    await this._repository.create(newCategory);
  }
}

export default CategoryService;
