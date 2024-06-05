import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Ingredient } from './entities/ingredient.entity';

@Injectable()
export class IngredientService {
  constructor(
    @InjectRepository(Ingredient)
    private ingredientRepository: Repository<Ingredient>,
  ) {}

  async getOrCreate(name: string): Promise<Ingredient> {
    let ingredient = await this.ingredientRepository.findOneBy({ name });

    if (!ingredient) {
      ingredient = new Ingredient();
      ingredient.name = name;

      await this.ingredientRepository.save(ingredient);
    }

    return ingredient;
  }
}
