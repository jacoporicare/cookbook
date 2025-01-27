import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { IIngredientRepository } from '@/modules/recipe/domain/ports/ingredient.repository';
import { IngredientEntity } from '@/modules/recipe/infrastructure/entities/ingredient.entity';

@Injectable()
export class TypeOrmIngredientRepository implements IIngredientRepository {
  constructor(
    @InjectRepository(IngredientEntity)
    private readonly repository: Repository<IngredientEntity>,
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
      await this.repository
        .createQueryBuilder()
        .insert()
        .into(IngredientEntity)
        .values(missing)
        .execute();
    }
  }
}
