import 'dotenv/config';

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
