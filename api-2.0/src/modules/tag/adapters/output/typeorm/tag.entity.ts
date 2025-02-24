import { Entity, ManyToMany, PrimaryColumn } from 'typeorm';

import { RecipeEntity } from '@/modules/recipe/adapters/output/typeorm/recipe.entity';

@Entity('tags')
export class TagEntity {
  @PrimaryColumn({ type: 'varchar', length: 255 })
  name!: string;

  @ManyToMany(() => RecipeEntity, recipe => recipe.tags)
  recipes?: RecipeEntity[];

  toDomain(): string {
    return this.name;
  }

  static fromDomain(name: string): TagEntity {
    const entity = new TagEntity();
    entity.name = name;

    return entity;
  }
}
