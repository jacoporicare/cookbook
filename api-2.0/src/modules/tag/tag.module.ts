import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TagResolver } from './adapters/input/graphql/resolvers/tag.resolver';
import { TagEntity } from './adapters/output/typeorm/entities/tag.entity';
import { TypeOrmTagRepository } from './adapters/output/typeorm/repositories/typeorm-tag.repository';
import { TagService } from './application/tag.service';
import { ITagRepositoryToken } from './ports/output/tag.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TagEntity])],
  providers: [
    TagService,
    TagResolver,
    {
      provide: ITagRepositoryToken,
      useClass: TypeOrmTagRepository,
    },
  ],
  exports: [ITagRepositoryToken],
})
export class TagModule {}
