import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  RelationId,
  UpdateDateColumn,
} from 'typeorm';

import { CookedRecipeEntity } from './cooked-recipe.entity';
import { RecipeImageEntity } from './recipe-image.entity';
import { RecipeIngredientEntity } from './recipe-ingredient.entity';
import { RecipeTagEntity } from './recipe-tag.entity';
import { SideDishEntity } from './side-dish.entity';

import { UserEntity } from '@/modules2/user/data/entities/user.entity';

@Entity('recipes')
export class RecipeEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @RelationId((recipe: RecipeEntity) => recipe.user)
  userId: string | null;

  @RelationId((recipe: RecipeEntity) => recipe.sideDish)
  sideDishId: string | null;

  @Column({ length: 255 })
  title: string;

  @Column({ length: 255, unique: true })
  slug: string;

  @Column('text', { nullable: true })
  directions: string | null;

  @Column({ nullable: true })
  preparationTime: number | null;

  @Column('int', { nullable: true })
  servingCount: number | null;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;

  @OneToOne(() => RecipeImageEntity)
  image?: RecipeImageEntity | null;

  @ManyToOne(() => UserEntity, user => user.recipes, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  user?: UserEntity | null;

  @ManyToOne(() => SideDishEntity, sideDish => sideDish.recipes, {
    nullable: true,
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  sideDish?: SideDishEntity | null;

  @OneToMany(() => RecipeIngredientEntity, ingredient => ingredient.recipe, {
    cascade: ['insert', 'remove'],
  })
  ingredients?: RecipeIngredientEntity[];

  @OneToMany(() => RecipeTagEntity, tag => tag.recipe, {
    cascade: ['insert', 'remove'],
  })
  tags?: RecipeTagEntity[];

  @OneToMany(() => CookedRecipeEntity, cooked => cooked.recipe)
  cookedRecipes?: CookedRecipeEntity[];
}
