import { Router } from 'express';
import { auth } from '../../auth/auth.service';

const router = Router();

router.get('/me', auth(), (req, res) => {
  res.json({
    id: req.user.id,
    username: req.user.username,
    name: req.user.name,
  });
});

export default router;
