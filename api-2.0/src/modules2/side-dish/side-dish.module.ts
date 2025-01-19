import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SideDishController } from './side-dish.controller';
import { SideDishService } from './side-dish.service';

import { SideDishEntity } from '@/db/entities';

@Module({
  imports: [TypeOrmModule.forFeature([SideDishEntity])],
  providers: [SideDishService],
  controllers: [SideDishController],
  exports: [SideDishService],
})
export class SideDishModule {}
