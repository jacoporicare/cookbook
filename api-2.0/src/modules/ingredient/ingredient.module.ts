import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { IngredientResolver } from './adapters/input/graphql/resolvers/ingredient.resolver';
import { IngredientEntity } from './adapters/output/typeorm/entities/ingredient.entity';
import { TypeOrmIngredientRepository } from './adapters/output/typeorm/repositories/typeorm-ingredient.repository';
import { IngredientService } from './application/ingredient.service';
import { IIngredientRepositoryToken } from './ports/output/ingredient.repository';

@Module({
  imports: [TypeOrmModule.forFeature([IngredientEntity])],
  providers: [
    IngredientService,
    IngredientResolver,
    {
      provide: IIngredientRepositoryToken,
      useClass: TypeOrmIngredientRepository,
    },
  ],
  exports: [IIngredientRepositoryToken],
})
export class IngredientModule {}
