import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ImageModule } from '../image/image.module';
import { IngredientModule } from '../ingredient/ingredient.module';
import { SideDishModule } from '../side-dish/side-dish.module';
import { TagModule } from '../tag/tag.module';
import { UserModule } from '../user/user.module';

import { RecipeResolver } from './adapters/input/graphql/resolvers/recipe.resolver';
import { CookedRecipeEntity } from './adapters/output/typeorm/entities/cooked-recipe.entity';
import { RecipeImageEntity } from './adapters/output/typeorm/entities/recipe-image.entity';
import { RecipeIngredientEntity } from './adapters/output/typeorm/entities/recipe-ingredient.entity';
import { RecipeEntity } from './adapters/output/typeorm/entities/recipe.entity';
import { TypeOrmRecipeRepository } from './adapters/output/typeorm/repositories/typeorm-recipe.repository';
import { RecipeService } from './application/recipe.service';
import { IRecipeRepositoryToken } from './ports/output/recipe.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CookedRecipeEntity,
      RecipeEntity,
      RecipeImageEntity,
      RecipeIngredientEntity,
    ]),
    UserModule,
    ImageModule,
    IngredientModule,
    SideDishModule,
    TagModule,
  ],
  providers: [
    RecipeService,
    RecipeResolver,
    {
      provide: IRecipeRepositoryToken,
      useClass: TypeOrmRecipeRepository,
    },
  ],
})
export class RecipeModule {}
