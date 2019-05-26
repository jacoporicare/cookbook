import { Router } from 'express';

import recipeRouter from './api/recipe/router';

const router = Router();

router.use('/api/recipes', recipeRouter);

export default router;
