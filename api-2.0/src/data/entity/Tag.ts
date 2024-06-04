import { Column, Entity, ManyToMany, PrimaryColumn } from 'typeorm';

import { Recipe } from './Recipe';

@Entity()
export class Tag {
  @Column()
  @PrimaryColumn()
  tag: string;

  @ManyToMany(() => Recipe, recipe => recipe.tags)
  recipes: Recipe[];
}
