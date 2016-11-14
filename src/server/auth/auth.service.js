'use strict';

import config from '../config';
import jwt from 'jsonwebtoken';
import expressJwt from 'express-jwt';
import compose from 'composable-middleware';

const users = [
  {
    id: 1,
    username: 'kubik',
    name: 'Kubík',
    password: 'maturita'
  },
  {
    id: 2,
    username: 'terezka',
    name: 'Terezka',
    password: 'zeryk'
  }
];

export function checkUser(username, password) {
  return users.find(u => u.username === username && u.password === password);
}

export function findUserById(id) {
  return users.find(u => u.id === id);
}

export function signToken(id) {
  return jwt.sign({ _id: id }, config.secrets.auth, { expiresIn: '1y' });
}

export function auth() {
  return compose()
    .use((req, res, next) => {
      // allow access_token to be passed through query parameter as well
      if (req.query && req.query.hasOwnProperty('access_token')) {
        req.headers.authorization = 'Bearer ' + req.query.access_token;
      }

      // IE11 forgets to set Authorization header sometimes. Pull from cookie instead.
      if (req.query && typeof req.headers.authorization === 'undefined') {
        req.headers.authorization = 'Bearer ' + req.cookies.token;
      }

      next();
    })
    .use(expressJwt({ secret: config.secrets.auth }))
    .use((err, req, res, next) => {
      if (err.name === 'UnauthorizedError') return res.status(401).end();

      next();
    })
    .use((req, res, next) => {
      const user = findUserById(req.user._id);

      if (!user) return res.status(401).end();

      req.user = user;
      next();
    });
}
