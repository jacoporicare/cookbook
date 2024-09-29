import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Recipe, User } from '.';

@Entity('cooked_recipes')
export class CookedRecipe {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column('integer')
  userId: number;

  @Column('integer')
  recipeId: number;

  @Column()
  date: Date;

  @ManyToOne(() => User, {
    eager: true,
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  user: User;

  @ManyToOne(() => Recipe, recipe => recipe.cookedRecipes, {
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  recipe: Promise<Recipe>;
}
