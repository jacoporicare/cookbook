import { Document, Schema, model, models, Model } from 'mongoose';

import { User } from './user';

export type Ingredient = {
  amount?: number;
  amountUnit?: string;
  name: string;
  isGroup: boolean;
};

export type Recipe = {
  userId: string;
  user: User;
  title: string;
  slug: string;
  directions?: string;
  sideDish?: string;
  preparationTime?: number;
  servingCount?: number;
  creationDate: Date;
  lastModifiedDate: Date;
  ingredients?: Ingredient[];
  imageName?: string;
  tags?: string[];
  deleted?: boolean;
};

export type RecipeDocument = Document & Recipe;

const RecipeSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  slug: { type: String, unique: true },
  directions: String,
  sideDish: String,
  preparationTime: Number,
  servingCount: Number,
  lastModifiedDate: { type: Date, default: Date.now },
  ingredients: {
    type: [
      {
        amount: Number,
        amountUnit: String,
        name: String,
        isGroup: Boolean,
      },
    ],
    default: undefined,
  },
  imageName: String,
  tags: { type: [String], default: undefined },
  deleted: Boolean,
});

/**
 * Virtuals
 */

RecipeSchema.virtual('user', {
  ref: 'User',
  localField: 'userId',
  foreignField: '_id',
  justOne: true,
});

RecipeSchema.virtual('creationDate').get(function (this: Document) {
  return this._id.getTimestamp();
});

/**
 * Validations
 */

RecipeSchema.path('title').validate((title: string) => title.length, 'Nadpis musí být vyplněný');

export default (models.Recipe as Model<RecipeDocument>) ||
  model<RecipeDocument>('Recipe', RecipeSchema);
