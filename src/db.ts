import * as mongoose from 'mongoose';

(mongoose as any).Promise = global.Promise;

let attempt = 0;
const maxAttempts = 3;

export let connected = false;

export function connect() {
  console.log(
    `Connecting to database at ${
      process.env.MONGO_URI
    } (attempt ${++attempt} of ${maxAttempts})...`,
  );

  mongoose.connect(
    process.env.MONGO_URI!,
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    },
    err => {
      if (err) {
        return retryConnect(`Unable to connect to database at ${process.env.MONGO_URI}`);
      }

      connected = true;
      attempt = 0;
      console.log(`Successfully connected to database at ${process.env.MONGO_URI}`);
    },
  );
}

mongoose.connection.on('disconnected', () => {
  if (connected) {
    retryConnect(`Disconnected from database at ${process.env.MONGO_URI}`);
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
