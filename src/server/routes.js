import { Router } from 'express';
import { auth, fakeAuth } from './auth/auth.service';

const router = Router();

router.use('/api/auth', require('./api/auth').default);
router.use('/api/users', require('./api/user').default);
router.use('/api/recipes', fakeAuth(), require('./api/recipe').default);

export default router;
