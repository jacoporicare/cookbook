import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { ReqUser } from './entities/req-user.entity';

export const User = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();

  return request.user as ReqUser;
});
