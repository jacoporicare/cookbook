import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { AuthGuard } from '@/modules/auth/guards/auth.guard';
import { ImageService } from '@/modules/recipe/application/image.service';

@Resolver()
export class ImageResolver {
  constructor(private readonly imageService: ImageService) {}

  @UseGuards(AuthGuard)
  @Mutation(() => String)
  async generatePresignedUploadUrl(
    @Args('fileName') fileName: string,
    @Args('mimeType') mimeType: string,
  ): Promise<string> {
    return this.imageService.generatePresignedUploadUrl(fileName, mimeType);
  }
}
