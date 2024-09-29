import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';

import { Ingredient, Recipe } from '.';

@Entity('recipe_ingredients')
export class RecipeIngredient {
  @PrimaryColumn('integer')
  recipeId: number;

  @PrimaryColumn('integer')
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
