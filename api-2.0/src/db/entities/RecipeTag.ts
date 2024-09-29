import { Entity, ManyToOne, PrimaryColumn } from 'typeorm';

import { Recipe, Tag } from '.';

@Entity('recipe_tags')
export class RecipeTag {
  @PrimaryColumn('integer')
  recipeId: number;

  @PrimaryColumn('integer')
  tagId: number;

  @ManyToOne(() => Recipe, recipe => recipe.tags, {
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  recipe: Recipe;

  @ManyToOne(() => Tag, tag => tag.recipeTags, {
    eager: true,
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  tag: Tag;
}
