import 'express-async-errors';
import { Router } from 'express';
import { authController } from './controllerInstances';
import authMiddleware from '../middlewares/authMiddleware';

const router = Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/validate', authMiddleware, authController.listUser);

export default router;
