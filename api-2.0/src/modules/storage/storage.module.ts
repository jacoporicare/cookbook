import { ConfigModule } from '@applifting-io/nestjs-decorated-config';
import { Module } from '@nestjs/common';

import { S3StorageAdapter } from './adapters/output/s3-storage.adapter';
import { IStorageToken } from './ports/output/storage.port';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: IStorageToken,
      useClass: S3StorageAdapter,
    },
  ],
  exports: [IStorageToken],
})
export class StorageModule {}
