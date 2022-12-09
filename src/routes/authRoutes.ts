import 'express-async-errors';
import { Router } from 'express';
import { authController } from './controllerInstances';

const router = Router();

router.post('/register', authController.register);
// router.post('/login', authController.login);
// router.get('/validate', authController.listUser);

export default router;
