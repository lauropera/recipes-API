import 'express-async-errors';
import { Router } from 'express';
import { categoryController } from './controllerInstances';

const router = Router();

router.get('/', categoryController.listAll);
// router.post('/:id', categoryController.listWithRecipes);

export default router;
