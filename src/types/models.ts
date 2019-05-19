export type User = {
  id: number;
  username: string;
  name: string;
  password?: string;
};

export type Recipe = {
  _id: string;
  title: string;
  slug: string;
  sideDish?: string;
  preparationTime?: number;
  userId: number;
  userName: string;
  hasImage?: boolean;
  lastModifiedDate: string;
};

export type RecipeDetail = Recipe & {
  directions?: string;
  servingCount?: number;
  userId: number;
  userName: string;
  ingredients: Ingredient[];
};

export type Ingredient = {
  _id?: string;
  name: string;
  amount?: number;
  amountUnit?: string;
  isGroup: boolean;
};

export type RecipeInput = {
  title: string;
  slug: string;
  directions?: string;
  sideDish?: string;
  preparationTime?: number;
  servingCount?: number;
  ingredients: IngredientInput[];
};

export type IngredientInput = {
  name: string;
  amount?: number;
  amountUnit?: string;
  isGroup: boolean;
};
