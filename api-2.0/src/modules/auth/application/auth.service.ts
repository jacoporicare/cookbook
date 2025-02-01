import { Inject, Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

import { Identity } from '../domain/identity';
import { IAuthRepository, IAuthRepositoryToken } from '../domain/ports/auth.repository';

import { Config } from '@/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly config: Config,
    @Inject(IAuthRepositoryToken) private readonly repository: IAuthRepository,
  ) {}

  signToken(identity: Identity): string {
    return jwt.sign({ userId: identity.userId }, this.config.jwtSecret, { expiresIn: '1y' });
  }

  async verifyToken(token: string): Promise<Identity | null> {
    try {
      const decoded = jwt.verify(token, this.config.jwtSecret) as unknown as { userId: string };
      const user = await this.repository.findById(decoded.userId);

      return user?.toIdentity() ?? null;
    } catch (err) {
      return null;
    }
  }

  async verifyCredentials(username: string, password: string): Promise<Identity | null> {
    const user = await this.repository.findByUsername(username);

    if (!user?.verifyPassword(password)) {
      return null;
    }

    return user.toIdentity();
  }
}
