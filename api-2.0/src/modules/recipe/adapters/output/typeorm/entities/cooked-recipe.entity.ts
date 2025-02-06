import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, RelationId } from 'typeorm';

import { RecipeEntity } from './recipe.entity';

import { CookedRecipe } from '@/modules/recipe/domain/value-objects/cooked-recipe';
import { UserEntity } from '@/modules/user/infrastructure/orm/user.entity';

@Entity('cooked_recipes')
export class CookedRecipeEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @RelationId<CookedRecipeEntity>(cooked => cooked.user)
  userId!: string;

  @RelationId<CookedRecipeEntity>(cooked => cooked.recipe)
  recipeId!: string;

  @Column()
  date!: Date;

  @ManyToOne(() => UserEntity, {
    nullable: false,
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  user!: UserEntity;

  @ManyToOne(() => RecipeEntity, recipe => recipe.cookedRecipes, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  recipe?: RecipeEntity;

  toDomain(): CookedRecipe {
    return new CookedRecipe(this.date, this.userId);
  }

  static fromDomain(cooked: CookedRecipe): CookedRecipeEntity {
    const cookedRecipe = new CookedRecipeEntity();
    cookedRecipe.date = cooked.date;
    cookedRecipe.userId = cooked.userId;

    return cookedRecipe;
  }
}
