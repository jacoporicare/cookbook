import { AuthPayload } from './auth/entities/auth-payload.entity';

declare module 'express' {
  interface Request {
    user?: AuthPayload;
  }
}
