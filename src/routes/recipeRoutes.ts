import 'express-async-errors';
import { Router } from 'express';
import {
  recipeController,
  favoriteRecipesController,
} from './controllerInstances';
import authMiddleware from '../middlewares/authMiddleware';

const router = Router();

router.get('/', recipeController.listAll);
router.get('/favorites', authMiddleware, favoriteRecipesController.listFavorites);

router.post('/:id/favorite', authMiddleware, favoriteRecipesController.add);
router.post('/:id/unfavorite', authMiddleware, favoriteRecipesController.remove);
router.get('/:id', recipeController.listById);

router.post('/new', authMiddleware, recipeController.create);

export default router;
