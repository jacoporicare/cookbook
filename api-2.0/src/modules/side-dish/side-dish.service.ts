import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { SideDish } from '@/db/entities';

@Injectable()
export class SideDishService {
  constructor(
    @InjectRepository(SideDish)
    private sideDishRepository: Repository<SideDish>,
  ) {}

  async getOrCreate(name: string): Promise<SideDish> {
    let sideDish = await this.sideDishRepository.findOneBy({ name });

    if (!sideDish) {
      sideDish = this.sideDishRepository.create({ name });

      await this.sideDishRepository.save(sideDish);
    }

    return sideDish;
  }

  findAll(): Promise<SideDish[]> {
    return this.sideDishRepository.find();
  }
}
