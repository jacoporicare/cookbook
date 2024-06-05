import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Recipe } from '../../recipe/entities/recipe.entity';

@Entity()
export class SideDish {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 255 })
  name: string;

  @OneToMany(() => Recipe, recipe => recipe.sideDish)
  recipes: Promise<Recipe[]>;
}
