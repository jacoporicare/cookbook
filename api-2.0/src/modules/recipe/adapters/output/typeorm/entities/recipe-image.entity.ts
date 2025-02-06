import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn, RelationId } from 'typeorm';

import { RecipeEntity } from './recipe.entity';

import { Image } from '@/modules/recipe/domain/value-objects/image';

@Entity('recipe_images')
export class RecipeImageEntity {
  @PrimaryColumn()
  @RelationId<RecipeImageEntity>(image => image.recipe)
  recipeId!: string;

  @Column('varchar', { length: 255 })
  storageKey!: string;

  @Column('varchar', { length: 255 })
  mimeType!: string;

  @Column('varchar', { length: 255 })
  thumbnailStorageKey!: string;

  @Column('varchar', { length: 255 })
  thumbnailMimeType!: string;

  @OneToOne(() => RecipeEntity, recipe => recipe.image, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  recipe?: RecipeEntity;

  toDomain(): Image {
    return new Image(
      this.storageKey,
      this.mimeType,
      this.thumbnailStorageKey,
      this.thumbnailMimeType,
    );
  }

  static fromDomain(image: Image): RecipeImageEntity {
    const entity = new RecipeImageEntity();
    entity.storageKey = image.storageKey;
    entity.mimeType = image.mimeType;
    entity.thumbnailStorageKey = image.thumbnailStorageKey;
    entity.thumbnailMimeType = image.thumbnailMimeType;

    return entity;
  }
}
