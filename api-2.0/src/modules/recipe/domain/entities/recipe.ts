import * as slugify from 'slug';
import { v4 as uuidv4 } from 'uuid';

import { CookedRecipe } from '../value-objects/cooked-recipe';
import { Image } from '../value-objects/image';
import { Ingredient } from '../value-objects/ingredient';

export class Recipe {
  constructor(
    public readonly id: string,
    public userId: string | null,
    public title: string,
    public slug: string,
    public directions: string | null,
    public preparationTime: number | null,
    public servingCount: number | null,
    public sideDish: string | null,
    public ingredients: Ingredient[],
    public tags: string[],
    public image: Image | null,
    public cookedRecipes: CookedRecipe[],
    public createdDate: Date,
    public updatedDate: Date,
  ) {}

  static createNew(
    userId: string | null,
    title: string,
    directions: string | null,
    preparationTime: number | null,
    servingCount: number | null,
    sideDish: string | null,
    image: Image | null,
    ingredients: Ingredient[],
    tags: string[],
  ): Recipe {
    const id = uuidv4();
    const slug = slugify(title);

    return new Recipe(
      id,
      userId,
      title,
      slug,
      directions,
      preparationTime,
      servingCount,
      sideDish,
      ingredients,
      tags,
      image,
      [],
      new Date(),
      new Date(),
    );
  }

  update(
    title: string,
    directions: string | null,
    preparationTime: number | null,
    servingCount: number | null,
    sideDish: string | null,
    ingredients: Ingredient[],
    tags: string[],
  ): Recipe {
    this.title = title;
    this.slug = slugify(title);
    this.directions = directions;
    this.preparationTime = preparationTime;
    this.servingCount = servingCount;
    this.sideDish = sideDish;
    this.ingredients = ingredients;
    this.tags = tags;

    return this;
  }

  updateImage(image: Image): Recipe {
    this.image = image;

    return this;
  }
}
