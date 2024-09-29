import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { IngredientModule } from '../ingredient/ingredient.module';
import { SideDishModule } from '../side-dish/side-dish.module';
import { TagModule } from '../tag/tag.module';
import { UserModule } from '../user/user.module';

import { RecipeController } from './recipe.controller';
import { RecipeService } from './recipe.service';

import { Recipe, RecipeIngredient, RecipeTag, User } from '@/db/entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([Recipe, RecipeIngredient, RecipeTag, User]),
    IngredientModule,
    SideDishModule,
    TagModule,
    UserModule,
  ],
  providers: [RecipeService],
  controllers: [RecipeController],
})
export class RecipeModule {}
