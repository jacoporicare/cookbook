import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UserService } from '../user/user.service';

import { SignInDto } from './dto/sign-in.dto';
import { AuthPayload } from './entities/auth-payload.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(signInDto: SignInDto): Promise<{ access_token: string }> {
    const user = await this.userService.findOneByUsername(signInDto.username);

    if (!user || !(await this.comparePassword(signInDto.password, user.password))) {
      throw new UnauthorizedException();
    }

    const payload: AuthPayload = {
      sub: user.id,
      username: user.username,
      displayName: user.displayName,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  private async comparePassword(password: string, encryptedPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, encryptedPassword);
  }
}
