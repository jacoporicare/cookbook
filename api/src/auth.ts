import { Request } from 'express';
import jwt from 'jsonwebtoken';

import { ResolverFn } from './generated/graphql';
import UserModel, { UserDbObject, UserDocument } from './models/user';

const jwtSecret = process.env.JWT_SECRET!;

export function signToken(user: {
  id: string;
  displayName: string;
  isAdmin: boolean;
}) {
  // `userId` is the only claim the API trusts (see `authenticated()` — it always
  // re-loads the user from the DB). `displayName`/`isAdmin` are included purely
  // so the web client can render the correct nav straight from the cookie,
  // without a round-trip. JWT payloads are readable (not secret), and these are
  // non-sensitive display values, so exposing them client-side is fine.
  return jwt.sign(
    { userId: user.id, displayName: user.displayName, isAdmin: user.isAdmin },
    jwtSecret,
    { expiresIn: '1y' },
  );
}

export function verifyToken<T>(token: string) {
  try {
    return jwt.verify(token, jwtSecret) as unknown as T;
  } catch (err) {
    return null;
  }
}

export function authenticated<TResult, TParent = unknown, TArgs = unknown>(
  next: ResolverFn<TResult, TParent, { currentUser: UserDbObject }, TArgs>,
  options: { requireAdmin?: boolean } = {},
) {
  const fn: ResolverFn<
    TResult,
    TParent,
    { currentUser: UserDbObject; req: Request },
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
      userDocument = payload?.userId
        ? await UserModel.findById(payload.userId)
        : null;
    }

    if (!userDocument || (options.requireAdmin && !userDocument.isAdmin)) {
      throw new Error(
        options.requireAdmin ? 'Unauthorized' : 'Unauthenticated',
      );
    }

    return next(
      root,
      args,
      {
        currentUser: userDocument.toObject<UserDbObject>({
          getters: true,
          versionKey: false,
        }),
      },
      info,
    );
  };

  return fn;
}
