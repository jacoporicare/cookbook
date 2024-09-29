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

import { CookedRecipe, RecipeImage, RecipeIngredient, RecipeTag, SideDish, User } from '.';

@Entity('recipes')
export class Recipe {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column('integer')
  userId: number;

  @Column('integer', { nullable: true })
  sideDishId: number;

  @Column({ length: 255 })
  title: string;

  @Column({ length: 255, unique: true })
  slug: string;

  @Column('text', { nullable: true })
  directions: string | null;

  @Column({ nullable: true })
  preparationTime: number;

  @Column('int', { nullable: true })
  servingCount: number | null;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToOne(() => RecipeImage)
  image: Promise<RecipeImage | null>;

  @ManyToOne(() => User, user => user.recipes, {
    eager: true,
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  user: User | null;

  @ManyToOne(() => SideDish, sideDish => sideDish.recipes, {
    nullable: true,
    eager: true,
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  sideDish: SideDish | null;

  @OneToMany(() => RecipeIngredient, ingredient => ingredient.recipe, {
    eager: true,
    cascade: ['insert', 'remove'],
  })
  ingredients: RecipeIngredient[];

  @OneToMany(() => RecipeTag, tag => tag.recipe, {
    eager: true,
    cascade: ['insert', 'remove'],
  })
  tags: RecipeTag[];

  @OneToMany(() => CookedRecipe, cooked => cooked.recipe)
  cookedRecipes: Promise<CookedRecipe[]>;
}
