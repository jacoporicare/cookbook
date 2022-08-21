import mongoose from 'mongoose';

import logger from './logger';

let attempt = 0;
const maxAttempts = 3;

export let connected = false;

function mongooseConnect(uri: string) {
  return new Promise<void>((resolve, reject) => {
    mongoose.connect(uri, err => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

export async function connectToDb() {
  while (attempt < maxAttempts) {
    try {
      logger.info(
        `Connecting to database at ${
          process.env.MONGO_URI
        } (attempt ${++attempt} of ${maxAttempts})...`,
      );

      await mongooseConnect(process.env.MONGO_URI!);

      connected = true;
      attempt = 0;
      logger.info(`Successfully connected to database at ${process.env.MONGO_URI}`);
      break;
    } catch (e) {
      if (attempt === maxAttempts) {
        throw new Error(`Unable to connect to database at ${process.env.MONGO_URI}`);
      }

      logger.error(e);
      logger.warn('Retrying in 30 seconds...');

      await new Promise(resolve => setTimeout(resolve, 30000));
    }
  }
}

mongoose.connection.on('disconnected', () => {
  if (connected) {
    logger.warn(`Disconnected from database at ${process.env.MONGO_URI}`);
  }

  connected = false;

  connectToDb().catch(logger.error);
});
