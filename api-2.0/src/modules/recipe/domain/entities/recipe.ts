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
    public image: Image | null,
    public ingredients: Ingredient[],
    public tags: string[],
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
    cookedRecipes: CookedRecipe[],
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
      image,
      ingredients,
      tags,
      cookedRecipes,
      new Date(),
      new Date(),
    );
  }

  updateTitle(title: string): Recipe {
    this.title = title;
    this.slug = slugify(title);
    this.touch();

    return this;
  }

  updateDirections(directions: string | null): Recipe {
    this.directions = directions;
    this.touch();

    return this;
  }

  updatePreparationTime(preparationTime: number | null): Recipe {
    this.preparationTime = preparationTime;
    this.touch();

    return this;
  }

  updateServingCount(servingCount: number | null): Recipe {
    this.servingCount = servingCount;
    this.touch();

    return this;
  }

  updateSideDish(sideDish: string | null): Recipe {
    this.sideDish = sideDish;
    this.touch();

    return this;
  }

  updateImage(image: Image | null): Recipe {
    this.image = image;
    this.touch();

    return this;
  }

  updateIngredients(ingredients: Ingredient[]): Recipe {
    this.ingredients = ingredients;
    this.touch();

    return this;
  }

  updateTags(tags: string[]): Recipe {
    this.tags = tags;
    this.touch();

    return this;
  }

  updateCookedRecipes(cookedRecipes: CookedRecipe[]): Recipe {
    this.cookedRecipes = cookedRecipes;
    this.touch();

    return this;
  }

  private touch() {
    this.updatedDate = new Date();
  }
}
