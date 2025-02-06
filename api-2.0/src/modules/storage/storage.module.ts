import { ConfigModule } from '@applifting-io/nestjs-decorated-config';
import { Module } from '@nestjs/common';

import { IStorageToken } from './domain/storage.port';
import { S3StorageAdapter } from './infrastructure/s3-storage.adapter';

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
