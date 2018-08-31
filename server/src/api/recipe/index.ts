import { Router } from 'express';
import * as mongoose from 'mongoose';
import * as slug from 'slug';
import * as fileType from 'file-type';
import * as sharp from 'sharp';
import * as fs from 'fs-extra';
import * as path from 'path';

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

function getThumbPath(slug: string): string {
  return `/tmp/cookbook/thumbs/${slug}.jpg`;
}

const router = Router();

router.get('/', async (req, res) => {
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

  try {
    const recipes = await query.select(
      '_id title slug preparationTime sideDish hasImage lastModifiedDate userId',
    );

    res.send(
      recipes
        .map(deleteNullValues)
        .map(appendUserName)
        .sort((a, b) => a.title.localeCompare(b.title, 'cs')),
    );
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get('/ingredients', async (req, res) => {
  try {
    const ingredients: string[] = await recipeModel.distinct('ingredients.name');

    res.send(ingredients.filter(Boolean).sort((a, b) => a.localeCompare(b, 'cs')));
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get('/side-dishes', async (req, res) => {
  try {
    const sideDishes: string[] = await recipeModel.distinct('sideDish');

    res.send(sideDishes.filter(Boolean).sort((a, b) => a.localeCompare(b, 'cs')));
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    let recipe = await recipeModel.findOne({ slug: id });

    if (recipe) {
      return res.send(appendUserName(deleteNullValues(recipe)));
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).end();
    }

    recipe = await recipeModel.findById(id);

    if (!recipe) {
      return res.status(404).end();
    }

    res.send(appendUserName(deleteNullValues(recipe)));
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get('/:slug/image-:size', async (req, res) => {
  const { slug, size } = req.params;
  const thumbPath = getThumbPath(slug);

  try {
    if (size === 'thumb' && fs.existsSync(thumbPath)) {
      return res.sendFile(thumbPath);
    }

    const recipe = await recipeModel.findOne({ slug }).select('image');

    if (!recipe || !recipe.image) {
      return res.status(404).end();
    }

    let image: Buffer | undefined = undefined;

    if (size === 'thumb') {
      image = await sharp(recipe.image)
        .resize(800, 800)
        .jpeg()
        .toBuffer();
      await fs.mkdirs(path.dirname(thumbPath));
      fs.writeFile(thumbPath, image).catch(console.log);
    } else {
      image = recipe.image;
    }

    const contentType = fileType(image).mime;
    res.contentType(contentType).send(image);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post('/', auth(), async (req, res) => {
  const recipe = getRecipe(req);

  try {
    const newRecipe = await recipeModel.create(recipe);

    res.status(201).send(deleteNullValues(newRecipe));
  } catch (err) {
    res.status(500).send(getError(err));
  }
});

router.post('/:id', auth(), async (req, res) => {
  const recipe = getRecipe(req);

  try {
    const newRecipe = await recipeModel.findByIdAndUpdate(
      req.params.id,
      { $set: recipe },
      { new: true },
    );

    if (!newRecipe) {
      return res.status(404).end();
    }

    res.send(deleteNullValues(newRecipe));
  } catch (err) {
    res.status(500).send(getError(err));
  }
});

router.post('/:id/image', auth(), async (req, res) => {
  try {
    const recipe = await recipeModel.findByIdAndUpdate(req.params.id, {
      $set: { image: req.body, hasImage: true },
    });

    if (!recipe) {
      return res.status(404).end();
    }

    const thumbPath = getThumbPath(recipe.slug);
    fs.remove(thumbPath).catch(console.log);

    res.status(201).end();
  } catch (err) {
    res.status(500).send(err);
  }
});

router.delete('/:id', auth(), async (req, res) => {
  try {
    const recipe = await recipeModel.findByIdAndRemove(req.params.id);

    if (recipe) {
      const thumbPath = getThumbPath(recipe.slug);
      fs.remove(thumbPath).catch(console.log);
    }

    res.status(204).end();
  } catch (err) {
    res.status(500).send(err);
  }
});

router.delete('/:id/image', auth(), async (req, res) => {
  try {
    const recipe = await recipeModel.findByIdAndUpdate(req.params.id, {
      $unset: { image: '', hasImage: '' },
    });

    if (recipe) {
      const thumbPath = getThumbPath(recipe.slug);
      fs.remove(thumbPath).catch(console.log);
    }

    res.status(204).end();
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post('/change-author/:slug/:userId', auth(), async (req, res) => {
  const { slug, userId } = req.params;

  try {
    await recipeModel.findOneAndUpdate({ slug }, { $set: { userId } });

    res.status(204).end();
  } catch (err) {
    res.status(500).send(err);
  }
});

export default router;
