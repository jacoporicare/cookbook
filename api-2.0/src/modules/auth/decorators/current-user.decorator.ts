import { createParamDecorator } from '@nestjs/common';

import { Identity as IdentityType } from '../domain/identity';
import { requestIdentity } from '../request-identity';

export const CurrentUser = createParamDecorator((): IdentityType | null => {
  return requestIdentity.get();
});
