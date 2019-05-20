import { Router } from 'express';
import fileType from 'file-type';
import fs from 'fs-extra';
import path from 'path';
import sharp from 'sharp';

import { auth, superAdminIds } from '../../auth.service';
import recipeModel from './recipe.model';

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

export default router;
