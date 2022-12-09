import Recipe, { IRecipe } from '../database/models/Recipe';

class RecipeService {
  private _repository = Recipe;

  async getAll(): Promise<IRecipe[]> {
    const recipes = await this._repository.findAll();
    return recipes;
  }
}

export default RecipeService;
