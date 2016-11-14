'use strict';

import { Router } from 'express';
import { checkUser, signToken } from '../../auth/auth.service';

const router = Router();

router.use('/local', (req, res, next) => {
  const user = checkUser(req.body.username, req.body.password);
  if (!user) return res.status(401).json({ message: 'Nesprávné uživatelské jméno nebo heslo.' });

  res.json({ token: signToken(user.id) });
});

export default router;
