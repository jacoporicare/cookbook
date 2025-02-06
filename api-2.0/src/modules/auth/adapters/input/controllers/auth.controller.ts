import { Body, Controller, Post, Req, Res, UnauthorizedException } from '@nestjs/common';
import { Request, Response } from 'express';

import { AuthService } from '@/modules/auth/application/auth.service';

@Controller('auth')
export class AuthController {
  private readonly refreshTokenCookieName = 'refresh_token';

  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: { username: string; password: string }, @Res() res: Response) {
    const { accessToken, refreshToken } = await this.authService.login(
      body.username,
      body.password,
    );

    res.cookie(this.refreshTokenCookieName, refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/auth/refresh',
    });

    return res.json({ access_token: accessToken });
  }

  @Post('refresh')
  async refreshToken(@Req() req: Request, @Res() res: Response) {
    const refreshToken = req.cookies[this.refreshTokenCookieName];

    if (!refreshToken) {
      throw new UnauthorizedException('No refresh token');
    }

    const { accessToken, refreshToken: newRefreshToken } =
      await this.authService.refreshAccessToken(refreshToken);

    res.cookie(this.refreshTokenCookieName, newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/auth/refresh',
    });

    return res.json({ access_token: accessToken });
  }

  @Post('logout')
  async logout(@Res() res: Response) {
    res.clearCookie(this.refreshTokenCookieName, { path: '/auth/refresh' });

    return res.status(204).end();
  }
}
