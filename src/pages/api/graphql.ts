import { ApolloServer } from 'apollo-server-micro';

import schema from '../../apollo/schema';

const apolloServer = new ApolloServer({
  schema,
  context: ctx => ctx,
  playground:
    process.env.NODE_ENV !== 'production' || process.env.APOLLO_PLAYGROUND_ENABLED === 'true',
  introspection:
    process.env.NODE_ENV !== 'production' || process.env.APOLLO_PLAYGROUND_ENABLED === 'true',
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default apolloServer.createHandler({ path: '/api/graphql' });
