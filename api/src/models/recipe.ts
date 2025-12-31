import { Document, Model, model, models, Schema } from 'mongoose';

import { ImageDbObject } from './image';
import { UserDbObject } from './user';

export type IngredientDbObject = {
  id: string;
  amount?: number;
  amountUnit?: string;
  name: string;
  isGroup: boolean;
};

export type RecipeCookedDbObject = {
  id: string;
  user: string | UserDbObject;
  date: Date;
};

export type RecipeDbObject = {
  id: string;
  user: string | UserDbObject;
  image?: string | ImageDbObject;
  title: string;
  slug: string;
  directions?: string;
  sideDish?: string;
  preparationTime?: number;
  servingCount?: number;
  creationDate: Date;
  lastModifiedDate: Date;
  ingredients: IngredientDbObject[];
  tags: string[];
  cookedHistory: RecipeCookedDbObject[];
  deleted: boolean;
};

export type RecipeDocument = Document & RecipeDbObject;

const RecipeSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  image: { type: Schema.Types.ObjectId, ref: 'Image' },
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
        name: { type: String, required: true },
        amount: Number,
        amountUnit: String,
        isGroup: { type: Boolean, default: false },
      },
    ],
    default: [],
  },
  tags: { type: [String], default: [] },
  deleted: { type: Boolean, default: false },
  cookedHistory: {
    type: [
      {
        user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        date: { type: Date, required: true },
      },
    ],
    default: [],
  },
});

/**
 * Virtuals
 */

RecipeSchema.virtual('creationDate').get(function (this: Document) {
  return this._id.getTimestamp();
});

/**
 * Validations
 */

RecipeSchema.paths.title.validate(
  (title: string) => title.length,
  'Nadpis musí být vyplněný',
);

export default (models.Recipe as Model<RecipeDocument>) ||
  model<RecipeDocument>('Recipe', RecipeSchema);
