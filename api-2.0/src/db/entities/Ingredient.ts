import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { RecipeIngredient } from '.';

@Entity()
export class Ingredient {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column('varchar', { length: 255, unique: true })
  name: string;

  @OneToMany(() => RecipeIngredient, recipeIngredient => recipeIngredient.ingredient)
  recipeIngredients: Promise<RecipeIngredient[]>;
}
