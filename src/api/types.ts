export type RecipeInput = {
  title: string;
  directions?: string | null;
  sideDish?: string | null;
  preparationTime?: number | null;
  servingCount?: number | null;
  ingredients: IngredientInput[];
  tags?: string[] | null;
};

export type IngredientInput = {
  name: string;
  amount?: number;
  amountUnit?: string;
  isGroup: boolean;
};

export type FileUpload = {
  createReadStream: () => NodeJS.ReadableStream;
  filename: string;
  mimetype: string;
  encoding: string;
};

export type UserInput = {
  username: string;
  displayName: string;
  isAdmin?: boolean;
};
