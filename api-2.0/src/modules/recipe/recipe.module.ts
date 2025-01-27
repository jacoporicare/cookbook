import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RecipeResolver } from './adapters/input/resolvers/recipe.resolver';
import { TypeOrmIngredientRepository } from './adapters/output/repositories/typeorm-ingredient.repository';
import { TypeOrmRecipeRepository } from './adapters/output/repositories/typeorm-recipe.repository';
import { TypeOrmSideDishRepository } from './adapters/output/repositories/typeorm-side-dish.repository';
import { TypeOrmTagRepository } from './adapters/output/repositories/typeorm-tag.repository';
import { RecipeService } from './application/recipe.service';
import { IIngredientRepositoryToken } from './domain/ports/ingredient.repository';
import { IRecipeRepositoryToken } from './domain/ports/recipe.repository';
import { ISideDishRepositoryToken } from './domain/ports/side-dish.repository';
import { ITagRepositoryToken } from './domain/ports/tag.repository';
import { CookedRecipeEntity } from './infrastructure/entities/cooked-recipe.entity';
import { IngredientEntity } from './infrastructure/entities/ingredient.entity';
import { RecipeImageEntity } from './infrastructure/entities/recipe-image.entity';
import { RecipeIngredientEntity } from './infrastructure/entities/recipe-ingredient.entity';
import { RecipeEntity } from './infrastructure/entities/recipe.entity';
import { SideDishEntity } from './infrastructure/entities/side-dish.entity';
import { TagEntity } from './infrastructure/entities/tag.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CookedRecipeEntity,
      IngredientEntity,
      RecipeEntity,
      RecipeImageEntity,
      RecipeIngredientEntity,
      SideDishEntity,
      TagEntity,
    ]),
    // StorageModule,
  ],
  providers: [
    RecipeService,
    RecipeResolver,
    {
      provide: IRecipeRepositoryToken,
      useClass: TypeOrmRecipeRepository,
    },
    {
      provide: IIngredientRepositoryToken,
      useClass: TypeOrmIngredientRepository,
    },
    {
      provide: ISideDishRepositoryToken,
      useClass: TypeOrmSideDishRepository,
    },
    {
      provide: ITagRepositoryToken,
      useClass: TypeOrmTagRepository,
    },
    // IStorageToken,
  ],
  exports: [RecipeService, IRecipeRepositoryToken],
})
export class RecipeModule {}
