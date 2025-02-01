import { createParamDecorator } from '@nestjs/common';

import { Identity as IdentityType } from '../domain/identity';
import { requestIdentity } from '../request-identity';

export const Identity = createParamDecorator((): IdentityType | null => {
  return requestIdentity.get();
});
