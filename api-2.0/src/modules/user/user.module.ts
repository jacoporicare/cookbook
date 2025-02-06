import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TypeOrmUserRepository } from './adapters/output/repositories/typeorm-user.repository';
import { UserService } from './application/user.service';
import { IUserRepositoryToken } from './domain/ports/user.repository';
import { UserEntity } from './infrastructure/orm/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [
    UserService,
    {
      provide: IUserRepositoryToken,
      useClass: TypeOrmUserRepository,
    },
  ],
  exports: [UserService],
})
export class UserModule {}
