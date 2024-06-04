import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Image } from './Image';
import { RecipeCooked } from './RecipeCooked';
import { RecipeIngredient } from './RecipeIngredient';
import { Tag } from './Tag';
import { User } from './User';

@Entity()
export class Recipe {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  slug: string;

  @Column({ nullable: true })
  directions: string;

  @Column({ nullable: true })
  sideDish: string;

  @Column({ nullable: true })
  preparationTime: number;

  @Column({ nullable: true })
  servingCount: number;

  @Column()
  creationDate: Date;

  @Column()
  lastModifiedDate: Date;

  @Column()
  deleted: boolean;

  @OneToOne(() => Image)
  image: Image;

  @ManyToOne(() => User, user => user.recipes, { onDelete: 'SET NULL', onUpdate: 'CASCADE' })
  user: User;

  @OneToMany(() => RecipeIngredient, ingredient => ingredient.recipe)
  ingredients: RecipeIngredient[];

  @OneToMany(() => RecipeCooked, cooked => cooked.recipe)
  cookedHistory: RecipeCooked[];

  @ManyToMany(() => Tag)
  @JoinTable()
  tags: Tag[];
}
