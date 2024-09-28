import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Ingredient, Recipe } from '.';

@Entity()
export class RecipeIngredient {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column('integer')
  recipeId: number;

  @Column('integer')
  ingredientId: number;

  @Column('float', { nullable: true })
  amount: number | null;

  @Column('varchar', { length: 255, nullable: true })
  amountUnit: string | null;

  @Column()
  isGroup: boolean;

  @ManyToOne(() => Recipe, recipe => recipe.ingredients, {
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  recipe: Recipe;

  @ManyToOne(() => Ingredient, ingredient => ingredient.recipeIngredients, {
    eager: true,
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  ingredient: Ingredient;
}
