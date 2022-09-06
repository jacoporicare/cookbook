import { cert, initializeApp } from 'firebase-admin/app';
import { getMessaging } from 'firebase-admin/messaging';
import fs from 'fs-extra';

import logger from './logger';

try {
  const serviceAccount = process.env.FIREBASE_ADMIN_SDK_PATH
    ? JSON.parse(fs.readFileSync(process.env.FIREBASE_ADMIN_SDK_PATH).toString())
    : require('./zradelnik-firebase-adminsdk.json');

  initializeApp({
    credential: cert({
      projectId: serviceAccount.project_id,
      privateKey: serviceAccount.private_key,
      clientEmail: serviceAccount.client_email,
    }),
  });
} catch (e) {
  logger.warn(
    'Firebase config not found (most probably, see error below).\nFor local development you have to download the Admin SDK JSON config file from Firebase console and place it to `api/src/zradelnik-firebase-adminsdk.json` (Git ignored).',
  );
  logger.error(e);
}

export const messaging = getMessaging();
