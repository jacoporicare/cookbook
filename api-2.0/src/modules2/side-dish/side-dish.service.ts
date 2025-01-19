import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { SideDishEntity } from '@/db/entities';

@Injectable()
export class SideDishService {
  constructor(
    @InjectRepository(SideDishEntity)
    private sideDishRepository: Repository<SideDishEntity>,
  ) {}

  async getOrCreate(name: string): Promise<SideDishEntity> {
    let sideDish = await this.sideDishRepository.findOneBy({ name });

    if (!sideDish) {
      sideDish = this.sideDishRepository.create({ name });

      await this.sideDishRepository.save(sideDish);
    }

    return sideDish;
  }

  findAll(): Promise<SideDishEntity[]> {
    return this.sideDishRepository.find();
  }
}
