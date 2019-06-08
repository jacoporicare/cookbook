import compose from 'composable-middleware';
import { NextFunction, Request, Response } from 'express';
import expressJwt from 'express-jwt';
import jwt from 'jsonwebtoken';
import Cookies from 'universal-cookie';

import userModel from '../models/user';
import { jwtSecret } from '../serverConfig';

export function signToken(id: number) {
  return jwt.sign({ _id: id }, jwtSecret, { expiresIn: '1y' });
}

export function authentication() {
  return compose()
    .use(
      expressJwt({
        secret: jwtSecret,
        credentialsRequired: false,
        getToken: req => {
          if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            return req.headers.authorization.split(' ')[1];
          }

          if (req.query && req.query.access_token) {
            return req.query.token;
          }

          return ((req as any).universalCookies as Cookies).get('access_token');
        },
      }),
    )
    .use((err: any, req: Request, res: Response, next: NextFunction) => {
      if (err.name === 'UnauthorizedError') {
        res.status(401).end();
        return;
      }

      next();
    })
    .use(async (req, res, next) => {
      if (req.user) {
        req.user = await userModel.findById(req.user._id);
      }

      next();
    });
}
