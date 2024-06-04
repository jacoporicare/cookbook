import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { RecipeIngredient } from './RecipeIngredient';

@Entity()
export class Ingredient {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany(() => RecipeIngredient, recipeIngredient => recipeIngredient.ingredient)
  recipeIngredients: RecipeIngredient[];
}
