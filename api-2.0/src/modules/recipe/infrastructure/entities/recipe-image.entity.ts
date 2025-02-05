import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn, RelationId } from 'typeorm';

import { Image } from '../../domain/value-objects/image';

import { RecipeEntity } from './recipe.entity';

@Entity('recipe_images')
export class RecipeImageEntity {
  @PrimaryColumn()
  @RelationId<RecipeImageEntity>(image => image.recipe)
  recipeId!: string;

  @Column('varchar', { length: 255 })
  fileName!: string;

  @Column('varchar', { length: 255 })
  storageKey!: string;

  @Column('varchar', { length: 255 })
  mimeType!: string;

  @Column('int')
  size!: number;

  @Column('text')
  thumbnail!: string;

  @OneToOne(() => RecipeEntity, recipe => recipe.image, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  recipe?: RecipeEntity;

  toDomain(): Image {
    return new Image(this.fileName, this.storageKey, this.mimeType, this.size, this.thumbnail);
  }

  static fromDomain(image: Image): RecipeImageEntity {
    const entity = new RecipeImageEntity();
    entity.fileName = image.fileName;
    entity.storageKey = image.storageKey;
    entity.mimeType = image.mimeType;
    entity.size = image.size;
    entity.thumbnail = image.thumbnail;

    return entity;
  }
}
