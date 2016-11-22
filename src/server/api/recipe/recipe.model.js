import mongoose from 'mongoose';

const RecipeSchema = new mongoose.Schema({
  user: { type: String, required: true },
  title: { type: String, required: true },
  slug: { type: String, unique: true },
  directions: String,
  sideDish: String,
  preparationTime: Number,
  servingCount: Number,
  lastModifiedDate: { type: Date, default: Date.now },
  ingredients: [{
    amount: Number,
    amountUnit: String,
    name: String,
    isGroup: Boolean
  }]
});

/**
 * Virtuals
 */

RecipeSchema.virtual('creationDate')
  .get(function () {
    return this._id.getTimestamp();
  });

/**
 * Validations
 */

RecipeSchema.path('title')
  .validate(title => title.length, 'Nadpis musí být vyplněný');

export default mongoose.model('Recipe', RecipeSchema);
