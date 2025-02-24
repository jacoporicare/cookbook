import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TypeOrmUserRepository } from './adapters/output/typeorm/typeorm-user.repository';
import { UserEntity } from './adapters/output/typeorm/user.entity';
import { UserService } from './application/user.service';
import { IUserRepositoryToken } from './ports/output/user.repository';

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
