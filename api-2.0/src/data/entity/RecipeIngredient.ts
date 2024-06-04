import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Ingredient } from './Ingredient';
import { Recipe } from './Recipe';

@Entity()
export class RecipeIngredient {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true, type: 'float' })
  amount: number;

  @Column({ nullable: true })
  amountUnit: string;

  @Column()
  isGroup: boolean;

  @ManyToOne(() => Recipe, recipe => recipe.ingredients, {
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  recipe: Recipe;

  @ManyToOne(() => Ingredient, ingredient => ingredient.recipeIngredients, {
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  ingredient: Ingredient;
}
