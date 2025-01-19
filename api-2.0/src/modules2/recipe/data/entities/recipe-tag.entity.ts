import { Entity, ManyToOne, PrimaryColumn, RelationId } from 'typeorm';

import { RecipeEntity } from './recipe.entity';

import { TagEntity } from '@/modules2/tag/data/entities/tag.entity';

@Entity('recipe_tags')
export class RecipeTagEntity {
  @PrimaryColumn('integer')
  @RelationId((recipeTag: RecipeTagEntity) => recipeTag.recipe)
  recipeId: number;

  @PrimaryColumn('integer')
  @RelationId((recipeTag: RecipeTagEntity) => recipeTag.tag)
  tagId: number;

  @ManyToOne(() => RecipeEntity, recipe => recipe.tags, {
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  recipe?: RecipeEntity;

  @ManyToOne(() => TagEntity, tag => tag.recipeTags, {
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  tag?: TagEntity;
}
