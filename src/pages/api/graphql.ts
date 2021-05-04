import { ApolloServer } from 'apollo-server-micro';
import cors from 'micro-cors';

import schema from '../../apollo/schema';

const playgroundAndIntrospectionEnabled =
  process.env.NODE_ENV !== 'production' || process.env.APOLLO_PLAYGROUND_ENABLED === 'true';

const apolloServer = new ApolloServer({
  schema,
  context: ctx => ctx,
  playground: playgroundAndIntrospectionEnabled,
  introspection: playgroundAndIntrospectionEnabled,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = apolloServer.createHandler({ path: '/api/graphql' });

export default cors()((req, res) => (req.method === 'OPTIONS' ? res.end() : handler(req, res)));
