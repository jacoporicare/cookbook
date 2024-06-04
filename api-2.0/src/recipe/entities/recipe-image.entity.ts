import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';

import { Recipe } from './recipe.entity';

@Entity()
export class RecipeImage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('bytea')
  data: Buffer;

  @Column()
  contentType: string;

  @OneToOne(() => Recipe, recipe => recipe.image, {
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  recipe: Recipe;
}
