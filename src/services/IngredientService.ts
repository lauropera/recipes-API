import Ingredient from '../database/models/Ingredient';
import { IngredientDetail } from '../interfaces/INewRecipe';
import {
  IIngredientFound,
  IIngredientsList,
  INewIngredient,
} from '../interfaces/IValuesList';

class IngredientService {
  private _repository = Ingredient;

  private async listExistentIngredients(
    list: IngredientDetail[],
  ): Promise<IIngredientFound[]> {
    const ingredients: IIngredientFound[] = [];

    const ingredientsList = list.map(async ({ name, amount, unit }) => {
      const ingredient = await this._repository.findOne({ where: { name } });

      if (ingredient) {
        ingredients.push({
          ingredientId: ingredient.dataValues.id,
          amount,
          unit,
        });
      }
    });

    await Promise.all(ingredientsList);

    return ingredients;
  }

  private async listNewIngredients(
    list: IngredientDetail[],
  ): Promise<INewIngredient[]> {
    const ingredients: INewIngredient[] = [];

    const ingredientsList = list.map(async ({ name, amount, unit }) => {
      const ingredient = await this._repository.findOne({ where: { name } });

      const isAlreadySaved = ingredients.some((item) => item.name === name);

      if (!ingredient && !isAlreadySaved) {
        ingredients.push({
          name,
          amount,
          unit,
        });
      }
    });

    await Promise.all(ingredientsList);

    return ingredients;
  }

  async getRecipeIngredients(
    data: IngredientDetail[],
  ): Promise<IIngredientsList> {
    const ingredientsFound = await this.listExistentIngredients(data);
    const newIngredients = await this.listNewIngredients(data);

    return { ingredientsFound, newIngredients };
  }
}

export default IngredientService;
