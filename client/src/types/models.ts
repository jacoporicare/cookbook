export type User = {
  id: number;
  name: string;
  username: string;
};

export type Recipe = {
  _id: string;
  title: string;
  slug: string;
  sideDish?: string;
  preparationTime?: number;
  userId: number;
  userName: string;
};

export type RecipeDetail = Recipe & {
  directions?: string;
  servingCount?: number;
  lastModifiedDate: string;
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
