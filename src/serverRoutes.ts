import { Router } from 'express';

import recipeRouter from './api/recipe';

const router = Router();

router.use('/api/recipes', recipeRouter);

export default router;
