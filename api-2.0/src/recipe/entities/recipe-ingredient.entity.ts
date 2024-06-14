import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Ingredient } from '../../ingredient/entities/ingredient.entity';

import { Recipe } from './recipe.entity';

@Entity()
export class RecipeIngredient {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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
