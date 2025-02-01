import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { User } from '../../domain/entities/user';
import { Password } from '../../domain/value-objects/password';

import { CookedRecipeEntity } from '@/modules/recipe/infrastructure/entities/cooked-recipe.entity';
import { RecipeEntity } from '@/modules/recipe/infrastructure/entities/recipe.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('varchar', { length: 255 })
  username!: string;

  @Exclude()
  @Column('char', { length: 60 })
  password!: string;

  @Column('varchar', { length: 255 })
  displayName!: string;

  @Column()
  isAdmin!: boolean;

  @Column({ nullable: true })
  lastActivity!: Date;

  @CreateDateColumn()
  createdDate!: Date;

  @UpdateDateColumn()
  updatedDate!: Date;

  @DeleteDateColumn()
  deletedAt!: Date;

  @OneToMany(() => RecipeEntity, recipe => recipe.user)
  recipes?: RecipeEntity[];

  @OneToMany(() => CookedRecipeEntity, cooked => cooked.user)
  cookedRecipes?: CookedRecipeEntity[];

  toDomain(): User {
    return new User(
      this.id,
      this.username,
      Password.fromHashed(this.password),
      this.displayName,
      this.isAdmin,
      this.lastActivity,
      this.createdDate,
      this.updatedDate,
    );
  }

  static fromDomain(user: User): UserEntity {
    const entity = new UserEntity();
    entity.id = user.id;
    entity.username = user.username;
    entity.password = user.password.toString();
    entity.displayName = user.displayName;
    entity.isAdmin = user.isAdmin;
    entity.lastActivity = user.lastActivity;
    entity.createdDate = user.createdDate;
    entity.updatedDate = user.updatedDate;

    return entity;
  }
}
