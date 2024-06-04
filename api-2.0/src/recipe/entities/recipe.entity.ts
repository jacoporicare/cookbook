import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { User } from '../../user/entities/user.entity';

import { RecipeCooked } from './recipe-cooked.entity';
import { RecipeImage } from './recipe-image.entity';
import { RecipeIngredient } from './recipe-ingredient.entity';

@Entity()
export class Recipe {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255 })
  title: string;

  @Column({ length: 255, unique: true })
  slug: string;

  @Column('text', { nullable: true })
  directions: string | null;

  @Column('varchar', { length: 255, nullable: true })
  sideDish: string | null;

  @Column({ nullable: true })
  preparationTime: number;

  @Column('int', { nullable: true })
  servingCount: number | null;

  @Column('varchar', { length: 255, array: true })
  tags: string[];

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToOne(() => RecipeImage)
  image: RecipeImage | null;

  @ManyToOne(() => User, user => user.recipes, { onDelete: 'SET NULL', onUpdate: 'CASCADE' })
  user: User | null;

  @OneToMany(() => RecipeIngredient, ingredient => ingredient.recipe, { cascade: true })
  ingredients: RecipeIngredient[];

  @OneToMany(() => RecipeCooked, cooked => cooked.recipe)
  cookedHistory: RecipeCooked[];
}
