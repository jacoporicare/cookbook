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

import { CookedRecipeEntity } from '@/modules2/recipe/data/entities/cooked-recipe.entity';
import { RecipeEntity } from '@/modules2/recipe/data/entities/recipe.entity';

@Entity('users')
export class UserEntity {
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

  @OneToMany(() => RecipeEntity, recipe => recipe.user)
  recipes?: RecipeEntity[];

  @OneToMany(() => CookedRecipeEntity, cooked => cooked.user)
  cookedRecipes?: CookedRecipeEntity[];
}
