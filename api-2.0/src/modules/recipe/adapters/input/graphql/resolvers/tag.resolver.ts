import { Query, Resolver } from '@nestjs/graphql';

import { TagService } from '@/modules/recipe/application/tag.service';

@Resolver()
export class TagResolver {
  constructor(private readonly tagService: TagService) {}

  @Query(() => [String])
  async tags(): Promise<string[]> {
    return this.tagService.getAllTags();
  }
}
