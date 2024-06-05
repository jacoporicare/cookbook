import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SideDish } from './entities/side-dish.entity';
import { SideDishController } from './side-dish.controller';
import { SideDishService } from './side-dish.service';

@Module({
  imports: [TypeOrmModule.forFeature([SideDish])],
  providers: [SideDishService],
  controllers: [SideDishController],
  exports: [SideDishService],
})
export class SideDishModule {}
