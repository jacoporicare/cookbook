import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { RecipeIngredientEntity } from '@/modules2/recipe/data/entities/recipe-ingredient.entity';

@Entity('ingredients')
export class IngredientEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 255, unique: true })
  name: string;

  @OneToMany(() => RecipeIngredientEntity, recipeIngredient => recipeIngredient.ingredient)
  recipeIngredients?: RecipeIngredientEntity[];
}
