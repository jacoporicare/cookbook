import { CanActivate, Injectable } from '@nestjs/common';

import { requestIdentity } from '../request-identity';

@Injectable()
export class UserGuard implements CanActivate {
  canActivate(): boolean {
    const identity = requestIdentity.get();

    return !!identity;
  }
}
