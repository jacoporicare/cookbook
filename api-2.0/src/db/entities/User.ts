import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Recipe, CookedRecipe } from '.';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column('varchar', { length: 255 })
  username: string;

  @Exclude()
  @Column('char', { length: 60 })
  password: string;

  @Column('varchar', { length: 255 })
  displayName: string;

  @Column()
  isAdmin: boolean;

  @Column({ nullable: true })
  lastActivity: Date;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(() => Recipe, recipe => recipe.user)
  recipes: Promise<Recipe[]>;

  @OneToMany(() => CookedRecipe, cooked => cooked.user)
  cookedRecipes: Promise<CookedRecipe[]>;
}
