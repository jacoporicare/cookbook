import { Inject } from '@nestjs/common';

export const RequestIdentityToken = Symbol('REQUEST_IDENTITY');

export const InjectRequestIdentity = () => Inject(RequestIdentityToken);
