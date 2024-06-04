import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { RecipeCooked } from '../../recipe/entities/recipe-cooked.entity';
import { Recipe } from '../../recipe/entities/recipe.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 255 })
  username: string;

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
  recipes: Recipe[];

  @OneToMany(() => RecipeCooked, cooked => cooked.user)
  recipeCookedHistory: RecipeCooked[];
}
