import { Entity, OneToMany, PrimaryColumn } from 'typeorm';

import { RecipeIngredientEntity } from './recipe-ingredient.entity';

@Entity('ingredients')
export class IngredientEntity {
  @PrimaryColumn('varchar', { length: 255 })
  name!: string;

  @OneToMany(() => RecipeIngredientEntity, ingredient => ingredient.ingredient)
  recipeIngredient?: RecipeIngredientEntity[];

  toDomain(): string {
    return this.name;
  }

  static fromDomain(name: string): IngredientEntity {
    const entity = new IngredientEntity();
    entity.name = name;

    return entity;
  }
}
