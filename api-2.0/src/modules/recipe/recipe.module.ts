import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { StorageModule } from '../storage/storage.module';
import { UserModule } from '../user/user.module';

import { ImageResolver } from './adapters/input/graphql/resolvers/image.resolver';
import { IngredientResolver } from './adapters/input/graphql/resolvers/ingredient.resolver';
import { RecipeResolver } from './adapters/input/graphql/resolvers/recipe.resolver';
import { SideDishResolver } from './adapters/input/graphql/resolvers/side-dish.resolver';
import { TagResolver } from './adapters/input/graphql/resolvers/tag.resolver';
import { CookedRecipeEntity } from './adapters/output/typeorm/entities/cooked-recipe.entity';
import { IngredientEntity } from './adapters/output/typeorm/entities/ingredient.entity';
import { RecipeImageEntity } from './adapters/output/typeorm/entities/recipe-image.entity';
import { RecipeIngredientEntity } from './adapters/output/typeorm/entities/recipe-ingredient.entity';
import { RecipeEntity } from './adapters/output/typeorm/entities/recipe.entity';
import { SideDishEntity } from './adapters/output/typeorm/entities/side-dish.entity';
import { TagEntity } from './adapters/output/typeorm/entities/tag.entity';
import { TypeOrmIngredientRepository } from './adapters/output/typeorm/repositories/typeorm-ingredient.repository';
import { TypeOrmRecipeRepository } from './adapters/output/typeorm/repositories/typeorm-recipe.repository';
import { TypeOrmSideDishRepository } from './adapters/output/typeorm/repositories/typeorm-side-dish.repository';
import { TypeOrmTagRepository } from './adapters/output/typeorm/repositories/typeorm-tag.repository';
import { ImageService } from './application/image.service';
import { IngredientService } from './application/ingredient.service';
import { RecipeService } from './application/recipe.service';
import { SideDishService } from './application/side-dish.service';
import { TagService } from './application/tag.service';
import { IIngredientRepositoryToken } from './ports/output/ingredient.repository';
import { IRecipeRepositoryToken } from './ports/output/recipe.repository';
import { ISideDishRepositoryToken } from './ports/output/side-dish.repository';
import { ITagRepositoryToken } from './ports/output/tag.repository';

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
    StorageModule,
    UserModule,
  ],
  providers: [
    RecipeService,
    RecipeResolver,
    ImageService,
    ImageResolver,
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
  ],
})
export class RecipeModule {}
