import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Recipe } from '.';

@Entity()
export class SideDish {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column('varchar', { length: 255, unique: true })
  name: string;

  @OneToMany(() => Recipe, recipe => recipe.sideDish)
  recipes: Promise<Recipe[]>;
}
