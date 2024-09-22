import { AuthPayload } from './modules/auth/entities/auth-payload.entity';

declare module 'express' {
  interface Request {
    user?: AuthPayload;
  }
}
