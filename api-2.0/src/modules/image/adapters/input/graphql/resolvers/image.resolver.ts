import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { FileUploadType } from '../types/file-upload.type';

import { AuthGuard } from '@/modules/auth/guards/auth.guard';
import { ImageService } from '@/modules/image/application/image.service';

@Resolver()
export class ImageResolver {
  constructor(private readonly imageService: ImageService) {}

  @UseGuards(AuthGuard)
  @Mutation(() => FileUploadType)
  async generatePresignedUploadUrl(@Args('mimeType') mimeType: string): Promise<FileUploadType> {
    const fileUpload = await this.imageService.generatePresignedUploadUrl(mimeType);

    return FileUploadType.fromDomain(fileUpload);
  }
}
