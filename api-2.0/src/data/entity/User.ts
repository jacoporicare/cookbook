import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Recipe } from './Recipe';
import { RecipeCooked } from './RecipeCooked';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column()
  displayName: string;

  @Column()
  isAdmin: boolean;

  @Column({ nullable: true })
  lastActivity: Date;

  @OneToMany(() => Recipe, recipe => recipe.user)
  recipes: Recipe[];

  @OneToMany(() => RecipeCooked, cooked => cooked.user)
  recipeCookedHistory: RecipeCooked[];
}
