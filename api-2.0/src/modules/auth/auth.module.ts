import { ConfigModule } from '@applifting-io/nestjs-decorated-config';
import { Global, MiddlewareConsumer, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserEntity } from '../user/adapters/output/typeorm/user.entity';

import { AuthController } from './adapters/input/controllers/auth.controller';
import { AuthResolver } from './adapters/input/graphql/auth.resolver';
import { TypeOrmAuthRepository } from './adapters/output/typeorm/typeorm-auth.repository';
import { AuthService } from './application/auth.service';
import { AuthMiddleware } from './auth.middleware';
import { RequestIdentityToken } from './decorators/inject-request-identity.decorator';
import { IAuthRepositoryToken } from './ports/output/auth.repository';
import { requestIdentity } from './request-identity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), ConfigModule, JwtModule],
  providers: [
    AuthService,
    AuthMiddleware,
    AuthResolver,
    {
      provide: IAuthRepositoryToken,
      useClass: TypeOrmAuthRepository,
    },
    {
      provide: RequestIdentityToken,
      useValue: requestIdentity,
    },
  ],
  controllers: [AuthController],
})
export class AuthModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AuthMiddleware).forRoutes('*');
  }
}
