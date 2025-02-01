// auth.middleware.ts

import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

import { AuthService } from './application/auth.service';
import { InjectRequestIdentity } from './decorators/inject-request-identity.decorator';
import { requestIdentity as requestIdentityVar } from './request-identity';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly authService: AuthService,
    @InjectRequestIdentity()
    private readonly requestIdentity: typeof requestIdentityVar,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const authorization = req.headers.authorization;

      if (authorization?.toLowerCase().startsWith('bearer ')) {
        const token = authorization.slice(7);
        const identity = await this.authService.verifyToken(token);

        this.requestIdentity.set(identity);
      }
    } catch (error) {
    } finally {
      next();
    }
  }
}
