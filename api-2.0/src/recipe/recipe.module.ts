import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { IngredientModule } from '../ingredient/ingredient.module';
import { SideDishModule } from '../side-dish/side-dish.module';
import { User } from '../user/entities/user.entity';
import { UserModule } from '../user/user.module';

import { Recipe } from './entities/recipe.entity';
import { RecipeController } from './recipe.controller';
import { RecipeService } from './recipe.service';

@Module({
  imports: [TypeOrmModule.forFeature([Recipe, User]), IngredientModule, SideDishModule, UserModule],
  providers: [RecipeService],
  controllers: [RecipeController],
})
export class RecipeModule {}
