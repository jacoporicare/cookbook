import { Router } from 'express';
import multer from 'multer';

import { verifyToken } from './auth';
import ImageModel from './models/image';
import UserModel from './models/user';

const upload = multer({
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
  },
  fileFilter: (_, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  },
});

export function imageUploadMiddleware() {
  const router = Router();

  router.post('/api/upload/image', upload.single('image'), async (req, res) => {
    try {
      // Check authentication
      const { authorization } = req.headers;
      let token: string | undefined;

      if (authorization?.split(' ')[0] === 'Bearer') {
        token = authorization.split(' ')[1];
      }

      if (!token) {
        return res.status(401).json({ error: 'Unauthenticated' });
      }

      const payload = verifyToken<{ userId: string }>(token);
      const user = payload?.userId
        ? await UserModel.findById(payload.userId)
        : null;

      if (!user) {
        return res.status(401).json({ error: 'Unauthenticated' });
      }

      // Check file
      if (!req.file) {
        return res.status(400).json({ error: 'No image file provided' });
      }

      // Save image to database
      const image = await ImageModel.create({
        data: req.file.buffer,
        contentType: req.file.mimetype,
      });

      return res.json({ imageId: image.id });
    } catch (error) {
      console.error('Image upload error:', error);
      return res.status(500).json({ error: 'Failed to upload image' });
    }
  });

  return router;
}
