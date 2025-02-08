import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { TagEntity } from '../entities/tag.entity';

import { ITagRepository } from '@/modules/tag/ports/output/tag.repository';

@Injectable()
export class TypeOrmTagRepository implements ITagRepository {
  constructor(
    @InjectRepository(TagEntity)
    private readonly repository: Repository<TagEntity>,
  ) {}

  async findAll(): Promise<string[]> {
    const entities = await this.repository.find({ order: { name: 'ASC' } });

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

  async deleteOrphans(): Promise<void> {
    await this.repository.query(
      `DELETE FROM "tags"
        WHERE NOT EXISTS (
        SELECT 1
        FROM "recipes_tags_tags" rt
        WHERE rt."tags_name" = "tags"."name"
      )`,
    );
  }
}
