import { StatusCodes } from 'http-status-codes';
import HttpException from '../utils/HttpException';
import Recipe from '../database/models/Recipe';
import User from '../database/models/User';
import UserFavoriteRecipe from '../database/models/UserFavoriteRecipe';

class FavoriteRecipeService {
  private _repository = UserFavoriteRecipe;
  private _userRepository = User;
  private _recipeRepository = Recipe;

  private async checkIfRecipeExists(id: number): Promise<void> {
    const recipe = await this._recipeRepository.findByPk(id);

    if (!recipe) {
      throw new HttpException(StatusCodes.NOT_FOUND, 'Recipe not found');
    }
  }

  private async checkIfIsFavorited(
    userId: number,
    recipeId: number,
  ): Promise<void> {
    const isFavorited = await this._repository.findOne({
      where: { userId, recipeId },
    });

    if (isFavorited) {
      throw new HttpException(
        StatusCodes.CONFLICT,
        'The recipe is already in favorites',
      );
    }
  }

  private async checkIfIsNotFavorited(
    userId: number,
    recipeId: number,
  ): Promise<void> {
    const isFavorited = await this._repository.findOne({
      where: { userId, recipeId },
    });

    if (!isFavorited) {
      throw new HttpException(
        StatusCodes.BAD_REQUEST,
        'The recipe is not in favorites',
      );
    }
  }

  async addToFavorites(recipeId: number, userEmail: string): Promise<void> {
    const user = (await this._userRepository.findOne({
      where: { email: userEmail },
    })) as User;

    const userId = user.dataValues.id;

    await this.checkIfRecipeExists(recipeId);
    await this.checkIfIsFavorited(userId, recipeId);

    await this._repository.create({
      userId,
      recipeId,
    });
  }

  async removeFromFavorites(
    recipeId: number,
    userEmail: string,
  ): Promise<void> {
    const user = (await this._userRepository.findOne({
      where: { email: userEmail },
    })) as User;

    const userId = user.dataValues.id;

    await this.checkIfRecipeExists(recipeId);
    await this.checkIfIsNotFavorited(userId, recipeId);

    await this._repository.destroy({
      where: {
        userId,
        recipeId,
      },
    });
  }
}

export default FavoriteRecipeService;
