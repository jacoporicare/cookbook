import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Recipe } from '.';

@Entity('recipe_images')
export class RecipeImage {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column('integer')
  recipeId: number;

  @Column('bytea')
  data: Buffer;

  @Column('varchar', { length: 255 })
  contentType: string;

  @OneToOne(() => Recipe, recipe => recipe.image, {
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  recipe: Promise<Recipe>;
}
