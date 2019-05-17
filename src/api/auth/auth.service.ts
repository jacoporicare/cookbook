import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import expressJwt from 'express-jwt';
import compose from 'composable-middleware';

import { User } from '../../types';
import config from '../../serverConfig';

const users: User[] = [
  {
    id: 1,
    username: 'kubik',
    name: 'Kubík',
    password: 'maturita',
  },
  {
    id: 2,
    username: 'terezka',
    name: 'Terezka',
    password: 'zeryk',
  },
  {
    id: 3,
    username: 'skleny',
    name: 'Kuba S.',
    password: 'Jachym14',
  },
  {
    id: 4,
    username: 'misa',
    name: 'Míša',
    password: 'Simon17',
  },
];

export const superAdminIds = [1, 2];

export function fakeAuth() {
  return (req: Request, res: Response, next: NextFunction) => {
    req.user = users[0];
    next();
  };
}

export function checkUser(username: string, password: string) {
  return users.find(u => u.username === username && u.password === password);
}

export function findUserById(id: number) {
  return users.find(u => u.id === id);
}

export function signToken(id: number) {
  return jwt.sign({ _id: id }, config.secrets.auth, { expiresIn: '1y' });
}

export function auth() {
  return (
    compose()
      .use((req, res, next) => {
        if (req.query && req.query.access_token) {
          req.headers.authorization = `Bearer ${req.query.access_token}`;
        }

        next();
      })
      .use(expressJwt({ secret: config.secrets.auth }))
      // tslint:disable-next-line no-any
      .use((err: any, req: Request, res: Response, next: NextFunction) => {
        if (err.name === 'UnauthorizedError') {
          res.status(401).end();
          return;
        }

        next();
      })
      .use((req, res, next) => {
        const user = findUserById(req.user._id);

        if (!user) {
          res.status(401).end();
          return;
        }

        req.user = user;
        next();
      })
  );
}
