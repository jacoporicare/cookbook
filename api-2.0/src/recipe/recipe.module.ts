import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Ingredient } from '../ingredient/entities/ingredient.entity';
import { User } from '../user/entities/user.entity';

import { Recipe } from './entities/recipe.entity';
import { RecipeController } from './recipe.controller';
import { RecipeService } from './recipe.service';

@Module({
  imports: [TypeOrmModule.forFeature([Recipe, Ingredient, User])],
  providers: [RecipeService],
  controllers: [RecipeController],
})
export class RecipeModule {}
