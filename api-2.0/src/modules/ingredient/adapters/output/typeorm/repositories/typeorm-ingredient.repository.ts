import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { IngredientEntity } from '../entities/ingredient.entity';

import { IIngredientRepository } from '@/modules/ingredient/ports/output/ingredient.repository';

@Injectable()
export class TypeOrmIngredientRepository implements IIngredientRepository {
  constructor(
    @InjectRepository(IngredientEntity)
    private readonly repository: Repository<IngredientEntity>,
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
      await this.repository
        .createQueryBuilder()
        .insert()
        .into(IngredientEntity)
        .values(missing)
        .execute();
    }
  }

  async deleteOrphans(): Promise<void> {
    await this.repository.query(
      `DELETE FROM "ingredients"
        WHERE NOT EXISTS (
        SELECT 1
        FROM "recipe_ingredients" ri
        WHERE ri."ingredient_name" = "ingredients"."name"
      )`,
    );
  }
}
