import * as mongoose from 'mongoose';

import config from './serverConfig';

// tslint:disable-next-line no-any
(mongoose as any).Promise = global.Promise;

let attempt = 0;
const maxAttempts = 3;

export let connected = false;

export function connect() {
  console.log(
    `Connecting to database at ${config.mongo.uri} (attempt ${++attempt} of ${maxAttempts})...`,
  );

  mongoose.connect(
    config.mongo.uri,
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    },
    err => {
      if (err) {
        return retryConnect(`Unable to connect to database at ${config.mongo.uri}`);
      }

      connected = true;
      attempt = 0;
      console.log(`Successfully connected to database at ${config.mongo.uri}`);
    },
  );
}

mongoose.connection.on('disconnected', () => {
  if (connected) {
    retryConnect(`Disconnected from database at ${config.mongo.uri}`);
  }

  connected = false;
});

function retryConnect(errorMsg: string) {
  if (attempt === maxAttempts) {
    throw new Error(errorMsg);
  }

  console.error(errorMsg);
  console.error(`Retrying in 30 seconds...`);

  setTimeout(connect, 30000);
}
