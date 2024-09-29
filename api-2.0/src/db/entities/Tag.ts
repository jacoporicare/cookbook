import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { RecipeTag } from '.';

@Entity('tags')
export class Tag {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column('varchar', { length: 255, unique: true })
  name: string;

  @OneToMany(() => RecipeTag, recipe => recipe.tag)
  recipeTags: Promise<RecipeTag[]>;
}
