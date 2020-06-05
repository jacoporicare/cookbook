export type RecipeInput = {
  title: string;
  directions: string | null;
  sideDish: string | null;
  preparationTime: number | null;
  servingCount: number | null;
  ingredients: IngredientInput[] | null;
  tags: string[] | null;
};

export type IngredientInput = {
  name: string;
  amount: number | null;
  amountUnit: string | null;
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
  isAdmin: boolean | null;
};
