export class CreateRecipeDto {
  title: string;
  directions?: string;
  sideDish?: string;
  preparationTime?: number;
  servingCount?: number;
  ingredients?: CreateRecipeIngredientDto[];
  tags?: string[];
}

export class CreateRecipeIngredientDto {
  name: string;
  amount?: number;
  amountUnit?: string;
  isGroup?: boolean;
}
