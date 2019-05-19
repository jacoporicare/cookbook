import { Router } from 'express';
import fileType from 'file-type';
import fs from 'fs-extra';
import path from 'path';
import sharp from 'sharp';
import slug from 'slug';

import { auth, findUserById, superAdminIds } from '../auth/auth.service';
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

function getRecipe({ body: recipe }: { body: Recipe }): Recipe {
  return {
    ...recipe,
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

async function checkUserRightsAsync(userId: number, recipeId: string) {
  if (superAdminIds.indexOf(userId) > -1) {
    return true;
  }

  const oldRecipe = await recipeModel.findById(recipeId);

  return Boolean(oldRecipe && oldRecipe.userId === userId);
}

function getThumbPath(slug: string): string {
  return path.join(`/tmp/cookbook/thumbs/${slug}.jpg`);
}

const router = Router();

router.get('/:slug/image-:size.jpg', async (req, res) => {
  const { slug, size } = req.params;
  const thumbPath = getThumbPath(slug);

  try {
    res.set('Cache-Control', 'public, max-age=31536000');

    if (size === 'thumb' && fs.existsSync(thumbPath)) {
      return res.sendFile(thumbPath);
    }

    const recipe = await recipeModel.findOne({ slug }).select('image');

    if (!recipe || !recipe.image) {
      return res.status(404).end();
    }

    const ft = fileType(recipe.image);
    const mimeType = ft ? ft.mime : 'image/jpeg';

    if (size !== 'thumb') {
      return res.contentType(mimeType).send(recipe.image);
    }

    await fs.mkdirs(path.dirname(thumbPath));
    const thumb = await sharp(recipe.image)
      .rotate()
      .resize(800, 800)
      .toBuffer();

    fs.writeFile(thumbPath, thumb).catch(console.error);

    res.contentType(mimeType).send(thumb);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post('/', auth(), async (req, res) => {
  const recipe = { ...getRecipe(req), userId: req.user.id };

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
    if (!(await checkUserRightsAsync(req.user.id, req.params.id))) {
      return res.status(403).end();
    }

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
    if (!(await checkUserRightsAsync(req.user.id, req.params.id))) {
      return res.status(403).end();
    }

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
    if (!(await checkUserRightsAsync(req.user.id, req.params.id))) {
      return res.status(403).end();
    }

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
    if (!(await checkUserRightsAsync(req.user.id, req.params.id))) {
      return res.status(403).end();
    }

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
