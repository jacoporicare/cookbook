import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { RecipeEntity } from './recipe.entity';

@Entity('side_dishes')
export class SideDishEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 255, unique: true })
  name: string;

  @OneToMany(() => RecipeEntity, recipe => recipe.sideDish)
  recipes?: RecipeEntity[];
}
