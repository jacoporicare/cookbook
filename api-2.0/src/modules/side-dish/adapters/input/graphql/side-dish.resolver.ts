import { Query, Resolver } from '@nestjs/graphql';

import { SideDishService } from '@/modules/side-dish/application/side-dish.service';

@Resolver()
export class SideDishResolver {
  constructor(private readonly sideDishService: SideDishService) {}

  @Query(() => [String])
  async sideDishes(): Promise<string[]> {
    return this.sideDishService.getAllSideDishes();
  }
}
