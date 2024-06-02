import { Request } from 'express';
import jwt from 'jsonwebtoken';

import { ResolverFn } from './generated/graphql';
import UserModel, { UserDbObject, UserDocument } from './models/user';

const jwtSecret = process.env.JWT_SECRET!;

export function signToken(userId: string) {
  return jwt.sign({ userId }, jwtSecret, { expiresIn: '1y' });
}

export function verifyToken<T>(token: string) {
  try {
    return jwt.verify(token, jwtSecret) as unknown as T;
  } catch (err) {
    return null;
  }
}

export function withUser<TResult, TParent = unknown, TArgs = unknown>(
  next: ResolverFn<TResult, TParent, { currentUser?: UserDbObject; req: Request }, TArgs>,
) {
  const fn: ResolverFn<
    TResult,
    TParent,
    { currentUser?: UserDbObject; req: Request },
    TArgs
  > = async (root, args, ctx, info) => {
    const { authorization } = ctx.req.headers;
    let token: string | undefined;

    if (authorization?.split(' ')[0] === 'Bearer') {
      token = authorization.split(' ')[1];
    }

    let userDocument: UserDocument | null = null;

    if (token) {
      const payload = verifyToken<{ userId: string }>(token);
      userDocument = payload?.userId ? await UserModel.findById(payload.userId) : null;
    }

    return next(
      root,
      args,
      {
        currentUser: userDocument?.toObject<UserDbObject>({ getters: true, versionKey: false }),
        req: ctx.req,
      },
      info,
    );
  };

  return fn;
}

export function requireUser<TResult, TParent = unknown, TArgs = unknown>(
  next: ResolverFn<TResult, TParent, { currentUser: UserDbObject; req: Request }, TArgs>,
  options: { requireAdmin?: boolean } = {},
) {
  const fn: ResolverFn<
    TResult,
    TParent,
    { currentUser?: UserDbObject; req: Request },
    TArgs
  > = async (root, args, ctx, info) => {
    if (!ctx.currentUser || (options.requireAdmin && !ctx.currentUser.isAdmin)) {
      throw new Error(options.requireAdmin ? 'Unauthorized' : 'Unauthenticated');
    }

    return next(root, args, { currentUser: ctx.currentUser, req: ctx.req }, info);
  };

  return withUser(fn);
}
