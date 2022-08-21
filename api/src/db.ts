import mongoose from 'mongoose';

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

export async function connectToDb(processName: string) {
  while (attempt < maxAttempts) {
    try {
      console.log(
        `${processName}: Connecting to database at ${
          process.env.MONGO_URI
        } (attempt ${++attempt} of ${maxAttempts})...`,
      );

      await mongooseConnect(process.env.MONGO_URI!);

      connected = true;
      attempt = 0;
      console.log(`${processName}: Successfully connected to database at ${process.env.MONGO_URI}`);
      break;
    } catch (e) {
      if (attempt === maxAttempts) {
        throw new Error(
          `${processName}: Unable to connect to database at ${process.env.MONGO_URI}`,
        );
      }

      console.error(e);
      console.error(`${processName}: Retrying in 30 seconds...`);

      await new Promise(resolve => setTimeout(resolve, 30000));
    }
  }
}

mongoose.connection.on('disconnected', () => {
  if (connected) {
    console.error(`Disconnected from database at ${process.env.MONGO_URI}`);
  }

  connected = false;

  connectToDb('reconnect').catch(console.error);
});
