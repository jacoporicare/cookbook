import { Router } from 'express';
import Recipe from './recipe.model';
import slug from 'slug';

const toSlug = title => slug(title, { mode: 'rfc3986' });
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
        { 'ingredients.name': { $in: q } }
      ]
    });
  }

  query.select('_id title slug preparationTime sideDish');

  query.then(results => res.send(results))
    .catch(err => res.status(500).send(err));
});

router.get('/ingredients', (req, res) => {
  Recipe.distinct('ingredients.name')
    .then(results => res.send(results))
    .catch(err => res.status(500).send(err));
});

router.get('/side-dishes', (req, res) => {
  Recipe.distinct('sideDish')
    .then(results => res.send(results))
    .catch(err => res.status(500).send(err));
});

router.get('/fix-slugs', (req, res) => {
  Recipe.find()
    .then(results => {
      results.forEach(recipe => {
        recipe.slug = toSlug(recipe.title);
        recipe.save();
      });

      res.status(201).end();
    })
    .catch(err => res.status(500).send(err));
});

router.get('/by-slug/:slug', (req, res) => {
  Recipe.findOne({ slug: req.params.slug })
    .then(result => res.send(result))
    .catch(err => res.status(500).send(err));
});

router.get('/:id', (req, res) => {
  Recipe.findById(req.params.id)
    .then(result => res.send(result))
    .catch(err => res.status(500).send(err));
});

router.post('/', (req, res) => {
  req.body.user = req.user.name;
  req.body.slug = toSlug(req.body.title);
  Recipe.create(req.body)
    .then(recipe => res.status(201).send(recipe))
    .catch(err => res.status(500).send(err));
});

router.post('/:id', (req, res) => {
  req.body.user = req.user.name;
  req.body.slug = toSlug(req.body.title);
  Recipe.findByIdAndUpdate(req.params.id, { $set: req.body })
    .then(recipe => res.send(recipe))
    .catch(err => res.status(500).send(err));
});

router.delete('/:id', (req, res) => {
  Recipe.findByIdAndRemove(req.params.id)
    .then(() => res.status(204).end())
    .catch(err => res.status(500).send(err));
});

export default router;
