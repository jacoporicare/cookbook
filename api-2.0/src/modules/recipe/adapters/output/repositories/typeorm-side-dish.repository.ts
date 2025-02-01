import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ISideDishRepository } from '@/modules/recipe/domain/ports/side-dish.repository';
import { SideDishEntity } from '@/modules/recipe/infrastructure/entities/side-dish.entity';

@Injectable()
export class TypeOrmSideDishRepository implements ISideDishRepository {
  constructor(
    @InjectRepository(SideDishEntity)
    private readonly repository: Repository<SideDishEntity>,
  ) {}

  async findAll(): Promise<string[]> {
    const entities = await this.repository.find({ order: { name: 'ASC' } });

    return entities.map(e => e.name);
  }

  async createIfNotExists(name: string): Promise<void> {
    const entity = await this.repository.findOneBy({ name });

    if (!entity) {
      await this.repository.save({ name });
    }
  }
}
