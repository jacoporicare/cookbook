import { ApolloServer } from 'apollo-server-express';

import typeDefs from './typeDefs';
import resolvers from './resolvers';

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ user: req.user }),
});

export default apolloServer;
