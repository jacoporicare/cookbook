import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn, RelationId } from 'typeorm';

import { Image } from '../../domain/value-objects/image';

import { RecipeEntity } from './recipe.entity';
@Entity('recipe_images')
export class RecipeImageEntity {
  @PrimaryColumn()
  @RelationId<RecipeImageEntity>(image => image.recipe)
  recipeId!: string;

  @Column('bytea')
  data!: Buffer;

  @Column('varchar', { length: 255 })
  contentType!: string;

  @OneToOne(() => RecipeEntity, recipe => recipe.image, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  recipe?: RecipeEntity;

  toDomain(): Image {
    return new Image(this.data, this.contentType);
  }

  static fromDomain(image: Image): RecipeImageEntity {
    const entity = new RecipeImageEntity();
    entity.data = image.data;
    entity.contentType = image.contentType;

    return entity;
  }
}
