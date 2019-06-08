import { User } from '../models/user';

export type Recipe = {
  _id: string;
  title: string;
  slug: string;
  sideDish?: string;
  preparationTime?: number;
  user: User;
  hasImage?: boolean;
  lastModifiedDate: string;
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
