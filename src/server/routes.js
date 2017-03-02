import { Router } from 'express';
import { auth } from './auth/auth.service';
import authRouter from './api/auth';
import userRouter from './api/user';
import recipeRouter from './api/recipe';

const router = Router();

router.use('/api/auth', authRouter);
router.use('/api/users', userRouter);
router.use('/api/recipes', auth(), recipeRouter);

export default router;
