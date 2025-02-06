import { Inject, Injectable } from '@nestjs/common';

import {
  IIngredientRepository,
  IIngredientRepositoryToken,
} from '../ports/output/ingredient.repository';

@Injectable()
export class IngredientService {
  constructor(
    @Inject(IIngredientRepositoryToken) private readonly repository: IIngredientRepository,
  ) {}

  async getAllIngredients(): Promise<string[]> {
    return this.repository.findAll();
  }
}
