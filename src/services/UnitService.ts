import { StatusCodes } from 'http-status-codes';
import {
  IAllIngredients,
  INewRecipeIngredient,
} from '../interfaces/IValuesList';
import Unit from '../database/models/Unit';
import HttpException from '../utils/HttpException';

class UnitService {
  private _repository = Unit;

  private async getUnitId(name: string): Promise<number> {
    const unit = await this._repository.findOne({
      where: { unitShort: name },
    });

    if (!unit) throw new HttpException(StatusCodes.NOT_FOUND, 'Invalid unit');

    return unit.id;
  }

  async formatUnitToId(
    ingredients: IAllIngredients[],
  ): Promise<INewRecipeIngredient[]> {
    const recipeIngredients: INewRecipeIngredient[] = [];

    const insertIds = ingredients.map(
      async ({ amount, ingredientId, unit, recipeId }) => {
        const unitId = unit ? await this.getUnitId(unit) : null;

        recipeIngredients.push({
          amount,
          unitId,
          ingredientId,
          recipeId,
        });
      },
    );

    await Promise.all(insertIds);

    return recipeIngredients;
  }
}

export default UnitService;
