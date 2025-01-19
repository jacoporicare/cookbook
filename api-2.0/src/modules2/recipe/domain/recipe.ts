export class Recipe {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly slug: string,
    public readonly createdDate: Date,
    public readonly updatedDate: Date,
    public readonly user: User | null = null,
    public readonly sideDish: SideDish | null = null,
    public ingredients: RecipeIngredient[] = [],
    public tags: RecipeTag[] = [],
    public readonly directions: string | null = null,
    public readonly preparationTime: number | null = null,
    public readonly servingCount: number | null = null,
    public readonly image: RecipeImage | null = null,
    public readonly deletedAt: Date | null = null,
  ) {}

  isDeleted(): boolean {
    return this.deletedAt !== null;
  }

  addIngredient(ingredient: RecipeIngredient): void {
    this.ingredients.push(ingredient);
  }

  addTag(tag: RecipeTag): void {
    if (!this.tags.some(t => t.equals(tag))) {
      this.tags.push(tag);
    }
  }

  removeTag(tag: RecipeTag): void {
    this.tags = this.tags.filter(t => !t.equals(tag));
  }
}
