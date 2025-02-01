import { Global, MiddlewareConsumer, Module } from '@nestjs/common';

import { RunContextMiddleware } from './run-context.middleware';

@Global()
@Module({
  providers: [RunContextMiddleware],
})
export class RunContextModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(RunContextMiddleware).forRoutes('*');
  }
}
