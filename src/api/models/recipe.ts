import { Document, Schema, model } from 'mongoose';

import { User } from './user';

export type Ingredient = {
  amount?: number;
  amountUnit?: string;
  name: string;
  isGroup: boolean;
};

export type Recipe = {
  user: User | string;
  title: string;
  slug: string;
  directions?: string;
  sideDish?: string;
  preparationTime?: number;
  servingCount?: number;
  lastModifiedDate: Date;
  ingredients: Ingredient[];
  hasImage?: boolean;
  tags?: string[];
};

export type RecipeDocument = Document & Recipe;

const RecipeSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
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
  hasImage: Boolean,
  tags: [String],
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

export default model<RecipeDocument>('Recipe', RecipeSchema);
