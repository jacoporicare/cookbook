import 'dotenv/config';

import { fork } from 'child_process';

import { startApolloServer } from './apolloServer';
import { connectToDb } from './db';
import resolvers from './resolvers';
import typeDefs from './typeDefs';

async function main() {
  await connectToDb('main');
  await startApolloServer(typeDefs, resolvers);
}

main().catch(console.error);

if (process.env.NODE_ENV === 'production') {
  console.log('main: Forking process - generateImages script');
  fork(__dirname + '/scripts/generateImages', { env: process.env });
}
