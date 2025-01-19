import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, RelationId } from 'typeorm';

import { RecipeEntity } from './recipe.entity';

import { UserEntity } from '@/modules2/user/data/entities/user.entity';

@Entity('cooked_recipes')
export class CookedRecipeEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @RelationId((cooked: CookedRecipeEntity) => cooked.user)
  userId: string;

  @RelationId((cooked: CookedRecipeEntity) => cooked.recipe)
  recipeId: string;

  @Column()
  date: Date;

  @ManyToOne(() => UserEntity, {
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  user?: UserEntity;

  @ManyToOne(() => RecipeEntity, recipe => recipe.cookedRecipes, {
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  recipe?: RecipeEntity;
}
