/* eslint-disable @typescript-eslint/no-explicit-any */
import { IncomingMessage, ServerResponse } from 'http';

import { IFieldResolver } from 'apollo-server-micro';
import jwt from 'jsonwebtoken';
import Cookies from 'universal-cookie';

import { AUTH_TOKEN_KEY } from '../const';

import userModel, { User, UserDocument } from './models/user';

const jwtSecret = process.env.JWT_SECRET!;

export function signToken(userId: string) {
  return jwt.sign({ userId }, jwtSecret, { expiresIn: '1y' });
}

export function verifyToken<T>(token: string) {
  try {
    return (jwt.verify(token, jwtSecret) as unknown) as T;
  } catch (err) {
    return null;
  }
}

export function authenticated<TArgs = Record<string, any>>(
  next: IFieldResolver<unknown, { currentUser: User }, TArgs>,
  options: { requireAdmin?: boolean } = {},
) {
  const fn: IFieldResolver<
    unknown,
    { req: IncomingMessage; res: ServerResponse; currentUser: User },
    TArgs
  > = async (root, args, ctx, info) => {
    const { authorization, cookie } = ctx.req.headers;
    let token = new Cookies(cookie).get<string | undefined>(AUTH_TOKEN_KEY);

    if (authorization?.split(' ')[0] === 'Bearer') {
      token = authorization.split(' ')[1];
    }

    let userDocument: UserDocument | null = null;

    if (token) {
      const payload = verifyToken<{ userId: string }>(token);
      userDocument = payload?.userId ? await userModel.findById(payload.userId) : null;
    }

    if (!userDocument || (options.requireAdmin && !userDocument.isAdmin)) {
      throw new Error(options.requireAdmin ? 'Unauthorized' : 'Unauthenticated');
    }

    return next(root, args, { currentUser: userDocument.toObject() }, info);
  };

  return fn;
}
