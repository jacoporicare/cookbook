import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, RelationId } from 'typeorm';

import { RecipeEntity } from './recipe.entity';

@Entity('recipe_images')
export class RecipeImageEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @RelationId((image: RecipeImageEntity) => image.recipe)
  recipeId: string;

  @Column('bytea')
  data: Buffer;

  @Column('varchar', { length: 255 })
  contentType: string;

  @OneToOne(() => RecipeEntity, recipe => recipe.image, {
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  recipe?: RecipeEntity;
}
