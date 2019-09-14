import { User } from '..';

declare module 'express' {
  export interface Request {
    user?: User;
  }
}

declare module 'express-serve-static-core' {
  export interface Request<P extends Params = ParamsDictionary> {
    user?: User;
  }
}
