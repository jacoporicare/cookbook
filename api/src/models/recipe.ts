import { Document, Model, Schema, model, models } from 'mongoose';

import { ImageDbObject } from './image';
import { UserDbObject } from './user';

export type IngredientDbObject = {
  id: string;
  amount?: number;
  amountUnit?: string;
  name: string;
  isGroup: boolean;
};

export type RecipeDbObject = {
  id: string;
  userId: string;
  user: UserDbObject;
  imageId?: string;
  image?: ImageDbObject;
  title: string;
  slug: string;
  directions?: string;
  sideDish?: string;
  preparationTime?: number;
  servingCount?: number;
  creationDate: Date;
  lastModifiedDate: Date;
  ingredients?: IngredientDbObject[];
  tags?: string[];
  deleted?: boolean;
};

export type RecipeDocument = Document & RecipeDbObject;

const RecipeSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  imageId: { type: Schema.Types.ObjectId, ref: 'Image' },
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
        isGroup: Boolean,
      },
    ],
    default: undefined,
  },
  imageUrl: String,
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

RecipeSchema.virtual('image', {
  ref: 'Image',
  localField: 'imageId',
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
