import { Router } from 'express';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { checkUser } from '../../auth/auth.service';

const router = Router();

passport.use(
  new LocalStrategy((username, password, done) => {
    const user = checkUser(username, password);

    if (user) return done(null, user);

    return done(null, false, {
      message: 'Nesprávné uživatelské jméno nebo heslo.',
    });
  }),
);

router.post('/', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    const error = err || info;
    if (error) return res.status(401).json(error);
    if (!user)
      return res.status(404).json({ message: 'Něco se pokazilo, prosím, zkuste to znovu.' });

    res.json({ token: user.id });
  })(req, res, next);
});

export default router;
