import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CognitoJwtVerifier } from 'aws-jwt-verify';

import { AuthService } from '../application/auth.service';

import { Config } from '@/config';

@Injectable()
export class CognitoAuthGuard implements CanActivate {
  private readonly logger = new Logger(CognitoAuthGuard.name);
  private verifier: ReturnType<typeof CognitoJwtVerifier.create>;

  constructor(
    private readonly reflector: Reflector,
    private readonly config: Config,
    @Inject(AuthService) private readonly authService: AuthService,
  ) {
    // Use config values instead of process.env
    const userPoolId = this.config.cognitoUserpoolId;
    const clientId = this.config.cognitoClientId;

    // Create the verifier
    this.verifier = CognitoJwtVerifier.create({
      userPoolId: userPoolId as string,
      clientId: clientId as string,
      tokenUse: 'id', // or 'access'
    });
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    // If using GraphQL, the context might be different (e.g. `context.switchToHttp` not used).
    // Alternatively, check 'context.getArgs()[2].req.headers' for GQL. Adjust as needed.

    const authHeader = req?.headers?.authorization;
    if (!authHeader) {
      throw new UnauthorizedException('Missing Authorization header');
    }

    try {
      const token = authHeader.split(' ')[1];
      const payload = await this.verifier.verify(token);

      // Optionally pass user info to the request
      req.user = payload;

      // Additional check in AuthService if needed
      if (!this.authService.validateUser(payload)) {
        throw new UnauthorizedException('Invalid user');
      }

      return true;
    } catch (err: any) {
      this.logger.warn('Invalid Cognito token: ' + err.message);
      throw new UnauthorizedException(err.message);
    }
  }
}
