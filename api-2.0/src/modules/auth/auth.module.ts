import { Global, MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CookbookConfigModule } from '../config.module';
import { UserEntity } from '../user/infrastructure/orm/user.entity';

import { AuthResolver } from './adapters/input/resolvers/auth.resolver';
import { TypeOrmAuthRepository } from './adapters/output/repositories/typeorm-auth.repository';
import { AuthService } from './application/auth.service';
import { AuthMiddleware } from './auth.middleware';
import { RequestIdentityToken } from './decorators/inject-request-identity.decorator';
import { IAuthRepositoryToken } from './domain/ports/auth.repository';
import { requestIdentity } from './request-identity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), CookbookConfigModule],
  providers: [
    {
      provide: IAuthRepositoryToken,
      useClass: TypeOrmAuthRepository,
    },
    AuthService,
    AuthMiddleware,
    {
      provide: RequestIdentityToken,
      useValue: requestIdentity,
    },
    AuthResolver,
  ],
})
export class AuthModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AuthMiddleware).forRoutes('*');
  }
}
