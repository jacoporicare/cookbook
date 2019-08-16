export type Recipe = {
  _id: string;
  title: string;
  slug: string;
  sideDish?: string;
  preparationTime?: number;
  user: User;
  hasImage?: boolean;
  lastModifiedDate: number;
};

export type RecipeDetail = Recipe & {
  directions?: string;
  servingCount?: number;
  ingredients: Ingredient[];
};

export type Ingredient = {
  _id?: string;
  name: string;
  amount?: number;
  amountUnit?: string;
  isGroup: boolean;
};

export type User = {
  _id: string;
  username: string;
  displayName: string;
  isAdmin?: boolean;
  lastActivity?: number;
};
