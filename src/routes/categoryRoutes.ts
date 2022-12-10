import 'express-async-errors';
import { Router } from 'express';
import { categoryController } from './controllerInstances';
import authMiddleware from '../middlewares/authMiddleware';

const router = Router();

router.post('/new', authMiddleware, categoryController.create);

export default router;
