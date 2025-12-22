import 'dotenv/config';

import { fork } from 'child_process';

import { startApolloServer } from './apolloServer';
import { connectToDb } from './db';
import logger from './logger';
import resolvers from './resolvers';
import typeDefs from './typeDefs';

async function main() {
  await connectToDb();
  await startApolloServer(typeDefs, resolvers);
}

main().catch((e) => {
  logger.error(e);
  process.exit(1);
});

if (process.env.NODE_ENV === 'production') {
  logger.info('Forking process - imagesGenerator script');
  fork(__dirname + '/scripts/imagesGenerator', [], {
    env: { ...process.env, LOGGER_CATEGORY: 'imagesGenerator' },
  });
}
