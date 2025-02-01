import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

import { RunContextStorage } from './run-context.storage';

@Injectable()
export class RunContextMiddleware implements NestMiddleware {
  use(_req: Request, _res: Response, next: NextFunction): void {
    RunContextStorage.run(() => {
      next();
    });
  }
}
