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

import { Recipe, RecipeCooked } from '.';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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

  @OneToMany(() => RecipeCooked, cooked => cooked.user)
  recipeCookedHistory: Promise<RecipeCooked[]>;
}
