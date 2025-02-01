import { Inject, Injectable } from '@nestjs/common';

import {
  IIngredientRepository,
  IIngredientRepositoryToken,
} from '../domain/ports/ingredient.repository';

@Injectable()
export class IngredientService {
  constructor(
    @Inject(IIngredientRepositoryToken) private readonly repository: IIngredientRepository,
  ) {}

  async getAllIngredients(): Promise<string[]> {
    return this.repository.findAll();
  }
}
