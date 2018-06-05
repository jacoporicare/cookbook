import { Router } from 'express';
import * as mongoose from 'mongoose';
import * as slug from 'slug';
import * as fileType from 'file-type';
import * as sharp from 'sharp';

import { User } from '../../types';
import { auth, findUserById } from '../../auth/auth.service';
import recipeModel, { Recipe, RecipeDocument } from './recipe.model';

function toSlug(title: string) {
  return slug(title.trim(), slug.defaults.modes.rfc3986);
}

// tslint:disable-next-line no-any
function getError(err: any) {
  if (err.code === 11000) {
    return {
      code: 11000,
      message: 'Název již existuje',
    };
  }

  return err;
}

function getRecipe({ body: recipe, user }: { body: Recipe; user?: User }): Recipe {
  return {
    ...recipe,
    userId: recipe.userId || (user ? user.id : 0),
    title: recipe.title.trim(),
    slug: toSlug(recipe.title),
    sideDish: recipe.sideDish ? recipe.sideDish.trim() : undefined,
    ingredients: recipe.ingredients
      ? recipe.ingredients.map(ingredient => ({
          ...ingredient,
          name: ingredient.name.trim(),
        }))
      : [],
    lastModifiedDate: new Date(),
  };
}

function deleteNullValues(o: RecipeDocument): Recipe {
  const obj = o.toJSON() as Recipe;

  Object.keys(obj).forEach(key => {
    if (obj[key] === null) {
      delete obj[key];
    }
  });

  return obj;
}

function appendUserName(recipe: Recipe): Recipe {
  const user = findUserById(recipe.userId);

  return {
    ...recipe,
    userName: user ? user.name : '',
  };
}

const router = Router();

router.get('/', (req, res) => {
  let query: mongoose.DocumentQuery<RecipeDocument[], RecipeDocument>;

  if (!req.query.q) {
    query = recipeModel.find();
  } else {
    const q = (<string>req.query.q)
      .split(',')
      .filter(s => s.trim() !== '')
      .map(s => new RegExp(s.trim(), 'i'));

    query = recipeModel.find({
      $or: [{ title: { $in: q } }, { sideDish: { $in: q } }, { 'ingredients.name': { $in: q } }],
    });
  }

  query
    .select('_id title slug preparationTime sideDish hasImage userId')
    .then(results =>
      res.send(
        results
          .map(deleteNullValues)
          .map(appendUserName)
          .sort((a, b) => a.title.localeCompare(b.title, 'cs')),
      ),
    )
    .catch(err => res.status(500).send(err));
});

router.get('/ingredients', (req, res) => {
  recipeModel
    .distinct('ingredients.name')
    .then((results: string[]) => res.send(results.sort((a, b) => a.localeCompare(b, 'cs'))))
    .catch(err => res.status(500).send(err));
});

router.get('/side-dishes', (req, res) => {
  recipeModel
    .distinct('sideDish')
    .then((results: string[]) =>
      res.send(results.filter(sd => sd && sd !== '').sort((a, b) => a.localeCompare(b, 'cs'))),
    )
    .catch(err => res.status(500).send(err));
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  recipeModel
    .findOne({ slug: id })
    .then(result => {
      if (result) {
        return res.send(appendUserName(deleteNullValues(result)));
      }

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).end();
      }

      recipeModel
        .findById(id)
        .then(result => {
          if (!result) {
            res.status(404).end();
            return;
          }

          res.send(appendUserName(deleteNullValues(result)));
        })
        .catch(err => res.status(500).send(err));
    })
    .catch(err => res.status(500).send(err));
});

router.get('/:slug/image-:size', (req, res) => {
  const { slug, size } = req.params;

  recipeModel
    .findOne({ slug })
    .select('image')
    .then(result => {
      if (!result || !result.image) {
        return res.status(404).end();
      }

      const contentType = fileType(result.image).mime;

      if (size !== 'thumb') {
        return res.contentType(contentType).send(result.image);
      }

      sharp(result.image)
        .resize(200, 200)
        .toBuffer()
        .then(newImage => res.contentType(contentType).send(newImage))
        .catch(err => res.status(500).send(err));
    })
    .catch(err => res.status(500).send(err));
});

router.post('/', auth(), (req, res) => {
  const recipe = getRecipe(req);

  recipeModel
    .create(recipe)
    .then(recipe => res.status(201).send(deleteNullValues(recipe)))
    .catch(err => res.status(500).send(getError(err)));
});

router.post('/:id', auth(), (req, res) => {
  const recipe = getRecipe(req);

  recipeModel
    .findByIdAndUpdate(req.params.id, { $set: recipe }, { new: true })
    .then(recipe => {
      if (!recipe) {
        return res.status(404).end();
      }

      res.send(deleteNullValues(recipe));
    })
    .catch(err => res.status(500).send(getError(err)));
});

router.post('/:id/image', (req, res) => {
  recipeModel
    .findByIdAndUpdate(req.params.id, { $set: { image: req.body, hasImage: true } })
    .then(recipe => {
      if (!recipe) {
        return res.status(404).end();
      }

      res.status(201).end();
    })
    .catch(err => res.status(500).send(err));
});

router.delete('/:id', auth(), (req, res) => {
  recipeModel
    .findByIdAndRemove(req.params.id)
    .then(() => res.status(204).end())
    .catch(err => res.status(500).send(err));
});

router.delete('/:id/image', (req, res) => {
  recipeModel
    .findByIdAndUpdate(req.params.id, { $unset: { image: '', hasImage: '' } })
    .then(recipe => res.status(204).end())
    .catch(err => res.status(500).send(err));
});

router.post('/change-author/:slug/:userId', auth(), (req, res) => {
  const { slug, userId } = req.params;

  recipeModel
    .findOneAndUpdate({ slug }, { $set: { userId } })
    .then(() => {
      res.status(204).end();
    })
    .catch(() => {
      res.status(500).end();
    });
});

export default router;
