import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { RecipeTagEntity } from '@/modules2/recipe/data/entities/recipe-tag.entity';

@Entity('tags')
export class TagEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 255, unique: true })
  name: string;

  @OneToMany(() => RecipeTagEntity, recipe => recipe.tag)
  recipeTags?: RecipeTagEntity[];
}
