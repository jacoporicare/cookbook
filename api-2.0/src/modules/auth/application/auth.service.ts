import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { Identity } from '../domain/identity';
import { IAuthRepository, IAuthRepositoryToken } from '../domain/ports/auth.repository';

import { Config } from '@/config';

export type Tokens = { accessToken: string; refreshToken: string };

export type TokenPayload = { userId: string };

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly config: Config,
    @Inject(IAuthRepositoryToken) private readonly repository: IAuthRepository,
  ) {}

  async login(username: string, password: string): Promise<Tokens> {
    const user = await this.repository.findByUsername(username);

    if (!user || !(await user.verifyPassword(password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.generateTokens(user.id);
  }

  async verifyAccessToken(accessToken: string): Promise<Identity | null> {
    try {
      const payload = this.jwtService.verify<TokenPayload>(accessToken, {
        secret: this.config.accessTokenSecret,
      });
      const user = await this.repository.findById(payload.userId);

      return user?.toIdentity() ?? null;
    } catch (err) {
      return null;
    }
  }

  async refreshAccessToken(refreshToken: string): Promise<Tokens> {
    try {
      const payload = this.jwtService.verify<TokenPayload>(refreshToken, {
        secret: process.env.REFRESH_TOKEN_SECRET,
      });

      return this.generateTokens(payload.userId);
    } catch (err) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  private generateTokens(userId: string): Tokens {
    const accessToken = this.jwtService.sign(
      { userId },
      { secret: this.config.accessTokenSecret, expiresIn: '1h' },
    );

    const refreshToken = this.jwtService.sign(
      { userId },
      { secret: this.config.refreshTokenSecret, expiresIn: '30d' },
    );

    return { accessToken, refreshToken };
  }
}
