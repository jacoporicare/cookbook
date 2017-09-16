import { Router } from 'express';
import mongoose from 'mongoose';
import slug from 'slug';
import { auth } from '../../auth/auth.service';
import Recipe from './recipe.model';

function toSlug(title) {
  return slug(title.trim(), { mode: 'rfc3986' });
}

function getError(err) {
  if (err.code === 11000) {
    return {
      code: 11000,
      message: 'Název již existuje',
    };
  }

  return err;
}

function getRecipe({ body: recipe, user }) {
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
    query = Recipe.find();
  } else {
    const q = req.query.q
      .split(',')
      .filter(s => s.trim() !== '')
      .map(s => new RegExp(s.trim(), 'i'));

    query = Recipe.find({
      $or: [
        { title: { $in: q } },
        { sideDish: { $in: q } },
        { 'ingredients.name': { $in: q } },
      ],
    });
  }

  query.select('_id title slug preparationTime sideDish');

  query
    .then(results =>
      res.send(results.sort((a, b) => a.title.localeCompare(b.title, 'cs'))),
    )
    .catch(err => res.status(500).send(err));
});

router.get('/ingredients', (req, res) => {
  Recipe.distinct('ingredients.name')
    .then(results => res.send(results.sort((a, b) => a.localeCompare(b, 'cs'))))
    .catch(err => res.status(500).send(err));
});

router.get('/side-dishes', (req, res) => {
  Recipe.distinct('sideDish')
    .then(results =>
      res.send(
        results
          .filter(sd => sd && sd !== '')
          .sort((a, b) => a.localeCompare(b, 'cs')),
      ),
    )
    .catch(err => res.status(500).send(err));
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  Recipe.findOne({ slug: id })
    .then(result => {
      if (result) {
        res.send(result);
        return;
      }

      if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).end();
        return;
      }

      Recipe.findById(id)
        .then(result => res.send(result))
        .catch(err => res.status(500).send(err));
    })
    .catch(err => res.status(500).send(err));
});

router.post('/', auth(), (req, res) => {
  const recipe = getRecipe(req);

  Recipe.create(recipe)
    .then(recipe => res.status(201).send(recipe))
    .catch(err => res.status(500).send(getError(err)));
});

router.post('/:id', auth(), (req, res) => {
  const recipe = getRecipe(req);

  Recipe.findByIdAndUpdate(req.params.id, { $set: recipe }, { new: true })
    .then(recipe => res.send(recipe))
    .catch(err => res.status(500).send(getError(err)));
});

router.delete('/:id', auth(), (req, res) => {
  Recipe.findByIdAndRemove(req.params.id)
    .then(() => res.status(204).end())
    .catch(err => res.status(500).send(err));
});

export default router;
