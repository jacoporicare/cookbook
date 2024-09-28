import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { IngredientModule } from '../ingredient/ingredient.module';
import { SideDishModule } from '../side-dish/side-dish.module';
import { UserModule } from '../user/user.module';

import { RecipeController } from './recipe.controller';
import { RecipeService } from './recipe.service';

import { Recipe, RecipeIngredient, User } from '@/db/entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([Recipe, RecipeIngredient, User]),
    IngredientModule,
    SideDishModule,
    UserModule,
  ],
  providers: [RecipeService],
  controllers: [RecipeController],
})
export class RecipeModule {}
