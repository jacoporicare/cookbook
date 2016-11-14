'use strict';

import { Router } from 'express';
import Recipe from './recipe.model';

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

router.get('/:id', (req, res) => {
  Recipe.findById(req.params.id)
    .then(result => res.send(result))
    .catch(err => res.status(500).send(err));
});

router.post('/', (req, res) => {
  req.body.user = req.user.name;
  Recipe.create(req.body)
    .then(recipe => res.status(201).send(recipe))
    .catch(err => res.status(500).send(err));
});

router.post('/:id', (req, res) => {
  req.body.user = req.user.name;
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
