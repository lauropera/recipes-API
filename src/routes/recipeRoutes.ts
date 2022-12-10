import 'express-async-errors';
import { Router } from 'express';
import { recipeController } from './controllerInstances';
import authMiddleware from '../middlewares/authMiddleware';

const router = Router();

router.get('/', recipeController.listAll);
router.get('/:id', recipeController.listById);
router.post('/new', authMiddleware, recipeController.create);

export default router;
