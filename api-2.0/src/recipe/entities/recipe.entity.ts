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

  @Column()
  title: string;

  @Column({ unique: true })
  slug: string;

  @Column('text', { nullable: true })
  directions: string | null;

  @Column('text', { nullable: true })
  sideDish: string | null;

  @Column({ nullable: true })
  preparationTime: number;

  @Column('int', { nullable: true })
  servingCount: number | null;

  @Column('text', { array: true })
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
