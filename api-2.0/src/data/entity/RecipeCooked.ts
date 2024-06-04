import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Recipe } from './Recipe';
import { User } from './User';

@Entity()
export class RecipeCooked {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  date: Date;

  @ManyToOne(() => User, { nullable: false, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn()
  user: User;

  @ManyToOne(() => Recipe, recipe => recipe.cookedHistory, {
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  recipe: Recipe;
}
