import { cert, initializeApp } from 'firebase-admin/app';
import { getMessaging } from 'firebase-admin/messaging';

import serviceAccount from './zradelnik-firebase-adminsdk.json';

initializeApp({
  credential: cert({
    projectId: serviceAccount.project_id,
    privateKey: serviceAccount.private_key,
    clientEmail: serviceAccount.client_email,
  }),
});

export const messaging = getMessaging();
