import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { ITagRepository } from '@/modules/recipe/domain/ports/tag.repository';
import { TagEntity } from '@/modules/recipe/infrastructure/entities/tag.entity';

@Injectable()
export class TypeOrmTagRepository implements ITagRepository {
  constructor(
    @InjectRepository(TagEntity)
    private readonly repository: Repository<TagEntity>,
  ) {}

  async findAll(): Promise<string[]> {
    const entities = await this.repository.find();

    return entities.map(e => e.name);
  }

  async createIfNotExists(names: string[]): Promise<void> {
    const existing = await this.repository.findBy({ name: In(names) });
    const missing = names
      .filter(name => !existing.some(e => e.name === name))
      .map(name => ({ name }));

    if (missing.length > 0) {
      await this.repository.createQueryBuilder().insert().into(TagEntity).values(missing).execute();
    }
  }
}
