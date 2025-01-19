import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';

import { User } from '../auth/auth.decorator';
import { AuthGuard } from '../auth/auth.guard';
import { AuthPayload } from '../auth/entities/auth-payload.entity';

import { RecipeService } from './domain/recipe.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';

@Controller('recipe')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@User() user: AuthPayload, @Body() createRecipeDto: CreateRecipeDto) {
    return this.recipeService.create(user.sub, createRecipeDto);
  }

  @Get()
  findAll() {
    return this.recipeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recipeService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async update(
    @User() user: AuthPayload,
    @Param('id') id: string,
    @Body() updateRecipeDto: UpdateRecipeDto,
  ) {
    if (!(await this.recipeService.canUpdate(id, user))) {
      throw new UnauthorizedException();
    }

    return this.recipeService.update(id, updateRecipeDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(@User() user: AuthPayload, @Param('id') id: string) {
    if (!(await this.recipeService.canUpdate(id, user))) {
      throw new UnauthorizedException();
    }

    return this.recipeService.remove(id);
  }
}
