import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  RelationId,
  UpdateDateColumn,
} from 'typeorm';

import { Recipe } from '../../domain/entities/recipe';
import { Image } from '../../domain/value-objects/image';

import { CookedRecipeEntity } from './cooked-recipe.entity';
import { RecipeImageEntity } from './recipe-image.entity';
import { RecipeIngredientEntity } from './recipe-ingredient.entity';
import { SideDishEntity } from './side-dish.entity';
import { TagEntity } from './tag.entity';

import { UserEntity } from '@/modules/user/infrastructure/orm/user.entity';

@Entity('recipes')
export class RecipeEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @RelationId<RecipeEntity>(recipe => recipe.user)
  userId!: string | null;

  @RelationId<RecipeEntity>(recipe => recipe.sideDish)
  sideDishName!: string | null;

  @Column({ length: 255 })
  title!: string;

  @Column({ length: 255, unique: true })
  slug!: string;

  @Column({ type: 'text', nullable: true })
  directions!: string | null;

  @Column({ type: 'int', nullable: true })
  preparationTime!: number | null;

  @Column({ type: 'int', nullable: true })
  servingCount!: number | null;

  @CreateDateColumn()
  createdDate!: Date;

  @UpdateDateColumn()
  updatedDate!: Date;

  @DeleteDateColumn()
  deletedAt!: Date | null;

  @ManyToMany(() => TagEntity, tag => tag.recipes, {
    cascade: true,
    eager: true,
  })
  @JoinTable()
  tags!: TagEntity[];

  @OneToOne(() => RecipeImageEntity, image => image.recipe, {
    eager: true,
  })
  image!: RecipeImageEntity | null;

  @ManyToOne(() => UserEntity, user => user.recipes, {
    eager: true,
  })
  @JoinColumn()
  user!: UserEntity | null;

  @ManyToOne(() => SideDishEntity, sideDish => sideDish.recipes, {
    nullable: true,
    cascade: true,
  })
  @JoinColumn()
  sideDish!: SideDishEntity | null;

  @OneToMany(() => RecipeIngredientEntity, ingredient => ingredient.recipe, {
    cascade: true,
    eager: true,
    orphanedRowAction: 'delete',
  })
  ingredients!: RecipeIngredientEntity[];

  @OneToMany(() => CookedRecipeEntity, cooked => cooked.recipe, {
    cascade: true,
    eager: true,
  })
  cookedRecipes!: CookedRecipeEntity[];

  toDomain(): Recipe {
    return new Recipe(
      this.id,
      this.userId,
      this.title,
      this.slug,
      this.directions,
      this.preparationTime,
      this.servingCount,
      this.tags.map(tag => tag.name),
      this.image ? new Image(this.image.data, this.image.contentType) : null,
      this.sideDishName,
      this.ingredients.map(ingredient => ingredient.toDomain()).sort((a, b) => a.order - b.order),
      this.cookedRecipes
        .map(cooked => cooked.toDomain())
        .sort((a, b) => a.date.getTime() - b.date.getTime()),
    );
  }

  static fromDomain(recipe: Recipe): RecipeEntity {
    const entity = new RecipeEntity();

    entity.id = recipe.id;
    entity.userId = recipe.userId;
    entity.title = recipe.title;
    entity.slug = recipe.slug;
    entity.directions = recipe.directions;
    entity.preparationTime = recipe.preparationTime;
    entity.servingCount = recipe.servingCount;
    entity.image = recipe.image ? RecipeImageEntity.fromDomain(recipe.image) : null;
    entity.ingredients = recipe.ingredients.map(RecipeIngredientEntity.fromDomain);
    entity.tags = recipe.tags.map(TagEntity.fromDomain);
    entity.sideDish = recipe.sideDish ? SideDishEntity.fromDomain(recipe.sideDish) : null;
    entity.cookedRecipes = recipe.cookedRecipes.map(CookedRecipeEntity.fromDomain);

    return entity;
  }
}
