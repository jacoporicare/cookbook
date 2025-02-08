import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SideDishResolver } from './adapters/input/graphql/resolvers/side-dish.resolver';
import { SideDishEntity } from './adapters/output/typeorm/entities/side-dish.entity';
import { TypeOrmSideDishRepository } from './adapters/output/typeorm/repositories/typeorm-side-dish.repository';
import { SideDishService } from './application/side-dish.service';
import { ISideDishRepositoryToken } from './ports/output/side-dish.repository';

@Module({
  imports: [TypeOrmModule.forFeature([SideDishEntity])],
  providers: [
    SideDishService,
    SideDishResolver,
    {
      provide: ISideDishRepositoryToken,
      useClass: TypeOrmSideDishRepository,
    },
  ],
  exports: [ISideDishRepositoryToken],
})
export class SideDishModule {}
