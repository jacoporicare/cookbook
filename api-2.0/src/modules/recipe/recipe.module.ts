import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { IngredientResolver } from './adapters/input/resolvers/ingredient.resolver';
import { RecipeResolver } from './adapters/input/resolvers/recipe.resolver';
import { SideDishResolver } from './adapters/input/resolvers/side-dish.resolver';
import { TagResolver } from './adapters/input/resolvers/tag.resolver';
import { TypeOrmIngredientRepository } from './adapters/output/repositories/typeorm-ingredient.repository';
import { TypeOrmRecipeRepository } from './adapters/output/repositories/typeorm-recipe.repository';
import { TypeOrmSideDishRepository } from './adapters/output/repositories/typeorm-side-dish.repository';
import { TypeOrmTagRepository } from './adapters/output/repositories/typeorm-tag.repository';
import { IngredientService } from './application/ingredient.service';
import { RecipeService } from './application/recipe.service';
import { SideDishService } from './application/side-dish.service';
import { TagService } from './application/tag.service';
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
    IngredientService,
    IngredientResolver,
    TagService,
    TagResolver,
    SideDishService,
    SideDishResolver,
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
})
export class RecipeModule {}
