import { ApolloServer } from 'apollo-server-micro';

import schema from '../../apollo/schema';

const apolloServer = new ApolloServer({
  schema,
  context: ctx => ctx,
  playground: process.env.NODE_ENV !== 'production',
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default apolloServer.createHandler({ path: '/api/graphql' });
