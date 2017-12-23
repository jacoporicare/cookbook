import { Document, Schema, model } from 'mongoose';

export interface Ingredient {
  amount: number;
  amountUnit: string;
  name: string;
  isGroup: boolean;
}

export interface Recipe {
  user: string;
  title: string;
  slug: string;
  directions?: string;
  sideDish?: string;
  preparationTime?: number;
  servingCount?: number;
  lastModifiedDate: Date;
  ingredients: Ingredient[];
}

export type RecipeDocument = Document & Recipe;

const RecipeSchema = new Schema({
  user: { type: String, required: true },
  title: { type: String, required: true },
  slug: { type: String, unique: true },
  directions: String,
  sideDish: String,
  preparationTime: Number,
  servingCount: Number,
  lastModifiedDate: { type: Date, default: Date.now },
  ingredients: [
    {
      amount: Number,
      amountUnit: String,
      name: String,
      isGroup: Boolean,
    },
  ],
});

/**
 * Virtuals
 */

RecipeSchema.virtual('creationDate').get(function(this: Document) {
  return this._id.getTimestamp();
});

/**
 * Validations
 */

RecipeSchema.path('title').validate((title: string) => title.length, 'Nadpis musí být vyplněný');

export default model('Recipe', RecipeSchema);
