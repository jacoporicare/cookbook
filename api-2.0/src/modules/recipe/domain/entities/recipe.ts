import slugify from 'slug';
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
    public tags: string[],
    public image: Image | null,
    public sideDish: string | null,
    public ingredients: Ingredient[],
    public cookedRecipes: CookedRecipe[],
  ) {}

  static createNew(props: Omit<Recipe, 'id' | 'slug'>): Recipe {
    const id = uuidv4();
    const slug = slugify(props.title);

    return new Recipe(
      id,
      props.userId,
      props.title,
      slug,
      props.directions,
      props.preparationTime,
      props.servingCount,
      props.tags,
      props.image,
      props.sideDish,
      props.ingredients,
      props.cookedRecipes,
    );
  }
}
