import { AuthPayload } from './modules2/auth/entities/auth-payload.entity';

declare module 'express' {
  interface Request {
    user?: AuthPayload;
  }
}
