import { Router } from 'express';
import * as mongoose from 'mongoose';
import * as slug from 'slug';
import { auth } from '../../auth/auth.service';
import RecipeModel, { Recipe } from './recipe.model';

function toSlug(title: string) {
  return slug(title.trim(), slug.defaults.modes.rfc3986);
}

function getError(err: any) {
  if (err.code === 11000) {
    return {
      code: 11000,
      message: 'Název již existuje',
    };
  }

  return err;
}

function getRecipe({ body: recipe, user }: { body: Recipe; user?: any }) {
  return {
    ...recipe,
    user: user.name,
    title: recipe.title.trim(),
    slug: toSlug(recipe.title),
    sideDish: recipe.sideDish ? recipe.sideDish.trim() : undefined,
    ingredients: recipe.ingredients
      ? recipe.ingredients.map(ingredient => ({
          ...ingredient,
          name: ingredient.name.trim(),
        }))
      : undefined,
  };
}

const router = Router();

router.get('/', (req, res) => {
  let query;

  if (!req.query.q) {
    query = RecipeModel.find();
  } else {
    const q = (<string>req.query.q)
      .split(',')
      .filter(s => s.trim() !== '')
      .map(s => new RegExp(s.trim(), 'i'));

    query = RecipeModel.find({
      $or: [{ title: { $in: q } }, { sideDish: { $in: q } }, { 'ingredients.name': { $in: q } }],
    });
  }

  query
    .select('_id title slug preparationTime sideDish')
    .then((results: Recipe[]) =>
      res.send(results.sort((a, b) => a.title.localeCompare(b.title, 'cs'))),
    )
    .catch(err => res.status(500).send(err));
});

router.get('/ingredients', (req, res) => {
  RecipeModel.distinct('ingredients.name')
    .then((results: string[]) => res.send(results.sort((a, b) => a.localeCompare(b, 'cs'))))
    .catch(err => res.status(500).send(err));
});

router.get('/side-dishes', (req, res) => {
  RecipeModel.distinct('sideDish')
    .then((results: string[]) =>
      res.send(results.filter(sd => sd && sd !== '').sort((a, b) => a.localeCompare(b, 'cs'))),
    )
    .catch(err => res.status(500).send(err));
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  RecipeModel.findOne({ slug: id })
    .then(result => {
      if (result) {
        res.send(result);
        return;
      }

      if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).end();
        return;
      }

      RecipeModel.findById(id)
        .then(result => {
          if (!result) {
            res.status(404).end();
            return;
          }

          res.send(result);
        })
        .catch(err => res.status(500).send(err));
    })
    .catch(err => res.status(500).send(err));
});

router.post('/', auth(), (req, res) => {
  const recipe = getRecipe(req);

  RecipeModel.create(recipe)
    .then(recipe => res.status(201).send(recipe))
    .catch(err => res.status(500).send(getError(err)));
});

router.post('/:id', auth(), (req, res) => {
  const recipe = getRecipe(req);

  RecipeModel.findByIdAndUpdate(req.params.id, { $set: recipe }, { new: true })
    .then(recipe => res.send(recipe))
    .catch(err => res.status(500).send(getError(err)));
});

router.delete('/:id', auth(), (req, res) => {
  RecipeModel.findByIdAndRemove(req.params.id)
    .then(() => res.status(204).end())
    .catch(err => res.status(500).send(err));
});

export default router;
