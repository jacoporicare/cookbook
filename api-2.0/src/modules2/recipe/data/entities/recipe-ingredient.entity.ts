import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, RelationId } from 'typeorm';

import { RecipeEntity } from './recipe.entity';

import { IngredientEntity } from '@/modules2/ingredient/data/entities/Ingredient';

@Entity('recipe_ingredients')
export class RecipeIngredientEntity {
  @PrimaryColumn('uuid')
  @RelationId((recipeIngredient: RecipeIngredientEntity) => recipeIngredient.recipe)
  recipeId: string;

  @PrimaryColumn('uuid')
  @RelationId((recipeIngredient: RecipeIngredientEntity) => recipeIngredient.ingredient)
  ingredientId: string;

  @Column('float', { nullable: true })
  amount: number | null;

  @Column('varchar', { length: 255, nullable: true })
  amountUnit: string | null;

  @Column()
  isGroup: boolean;

  @ManyToOne(() => RecipeEntity, recipe => recipe.ingredients, {
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  @JoinColumn()
  recipe?: RecipeEntity;

  @ManyToOne(() => IngredientEntity, ingredient => ingredient.recipeIngredients, {
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  ingredient?: IngredientEntity;
}
