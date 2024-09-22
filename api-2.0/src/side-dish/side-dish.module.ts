import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SideDishController } from './side-dish.controller';
import { SideDishService } from './side-dish.service';

import { SideDish } from '@/db/entities';

@Module({
  imports: [TypeOrmModule.forFeature([SideDish])],
  providers: [SideDishService],
  controllers: [SideDishController],
  exports: [SideDishService],
})
export class SideDishModule {}
