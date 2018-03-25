export interface User {
  id: number;
  name: string;
  username: string;
}

export interface Recipe {
  _id: string;
  title: string;
  slug: string;
  sideDish?: string;
  preparationTime?: number;
  userId: number;
  userName: string;
}

export interface RecipeDetail extends Recipe {
  directions?: string;
  servingCount?: number;
  lastModifiedDate: string;
  userId: number;
  userName: string;
  ingredients: Ingredient[];
}

export interface Ingredient {
  _id?: string;
  name: string;
  amount?: number;
  amountUnit?: string;
  isGroup: boolean;
}
