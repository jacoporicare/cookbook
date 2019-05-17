import { Router } from 'express';

import { checkUser, signToken } from './auth.service';

const router = Router();

router.use('/local', (req, res) => {
  const user = checkUser(req.body.username, req.body.password);
  if (!user) {
    res.status(401).json({ message: 'Nesprávné uživatelské jméno nebo heslo.' });
    return;
  }

  res.json({
    token: signToken(user.id),
    user: {
      id: user.id,
      username: user.username,
      name: user.name,
    },
  });
});

export default router;
