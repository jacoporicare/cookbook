import { Module } from '@nestjs/common';

import { StorageModule } from '../storage/storage.module';

import { ImageResolver } from './adapters/input/graphql/resolvers/image.resolver';
import { ImageService } from './application/image.service';

@Module({
  imports: [StorageModule],
  providers: [ImageService, ImageResolver],
  exports: [ImageService],
})
export class ImageModule {}
