import { Entity, OneToMany, PrimaryColumn } from 'typeorm';

import { RecipeEntity } from './recipe.entity';

@Entity('side_dishes')
export class SideDishEntity {
  @PrimaryColumn({ type: 'varchar', length: 255 })
  name!: string;

  @OneToMany(() => RecipeEntity, recipe => recipe.sideDish)
  recipes?: RecipeEntity[];

  toDomain(): string {
    return this.name;
  }

  static fromDomain(name: string): SideDishEntity {
    const entity = new SideDishEntity();
    entity.name = name;

    return entity;
  }
}
