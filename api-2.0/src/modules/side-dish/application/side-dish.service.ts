import { Inject, Injectable } from '@nestjs/common';

import {
  ISideDishRepositoryToken,
  ISideDishRepository,
} from '../ports/output/side-dish.repository';

@Injectable()
export class SideDishService {
  constructor(@Inject(ISideDishRepositoryToken) private readonly repository: ISideDishRepository) {}

  async getAllSideDishes(): Promise<string[]> {
    return this.repository.findAll();
  }
}
