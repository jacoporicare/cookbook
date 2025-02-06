import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, RelationId } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { IngredientEntity } from './ingredient.entity';
import { RecipeEntity } from './recipe.entity';

import { Ingredient } from '@/modules/recipe/domain/value-objects/ingredient';

@Entity('recipe_ingredients')
export class RecipeIngredientEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @RelationId<RecipeIngredientEntity>(ingredient => ingredient.recipe)
  recipeId!: string;

  @RelationId<RecipeIngredientEntity>(ingredient => ingredient.ingredient)
  ingredientName!: string;

  @Column('float', { nullable: true })
  amount!: number | null;

  @Column('varchar', { length: 255, nullable: true })
  amountUnit!: string | null;

  @Column()
  isGroup!: boolean;

  @Column({ default: 0 })
  order!: number;

  @ManyToOne(() => RecipeEntity, recipe => recipe.ingredients, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  recipe?: RecipeEntity;

  @ManyToOne(() => IngredientEntity, ingredient => ingredient.recipeIngredient, {
    nullable: false,
    cascade: true,
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  ingredient!: IngredientEntity;

  toDomain(): Ingredient {
    return new Ingredient(this.ingredientName, this.amount, this.amountUnit, this.isGroup);
  }

  static fromDomain(ingredient: Ingredient, order: number): RecipeIngredientEntity {
    const ingredientEntity = new IngredientEntity();
    ingredientEntity.name = ingredient.name;

    const recipeIngredientEntity = new RecipeIngredientEntity();
    recipeIngredientEntity.id = uuidv4();
    recipeIngredientEntity.ingredient = ingredientEntity;
    recipeIngredientEntity.amount = ingredient.amount;
    recipeIngredientEntity.amountUnit = ingredient.amountUnit;
    recipeIngredientEntity.isGroup = ingredient.isGroup;
    recipeIngredientEntity.order = order;

    return recipeIngredientEntity;
  }
}
