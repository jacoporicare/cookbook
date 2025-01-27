import { Module } from '@nestjs/common';

import { AuthService } from './application/auth.service';
import { CognitoAuthGuard } from './domain/cognito-auth.guard';

@Module({
  providers: [AuthService, CognitoAuthGuard],
  exports: [AuthService, CognitoAuthGuard],
})
export class AuthModule {}
