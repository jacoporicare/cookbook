import http from 'http';

import { IExecutableSchemaDefinition } from '@graphql-tools/schema';
import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageProductionDefault,
} from 'apollo-server-core';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { graphqlUploadExpress } from 'graphql-upload';

import logger from './logger';
import { recipeImageMiddleware } from './recipeImage';

export async function startApolloServer(
  typeDefs: IExecutableSchemaDefinition['typeDefs'],
  resolvers: IExecutableSchemaDefinition['resolvers'],
) {
  const app = express();
  app.use(recipeImageMiddleware());
  app.use(graphqlUploadExpress());

  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    cache: 'bounded',
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      process.env.APOLLO_EXPLORER_ENABLED !== 'true'
        ? ApolloServerPluginLandingPageProductionDefault()
        : ApolloServerPluginLandingPageLocalDefault({ embed: true }),
    ],
    introspection: process.env.APOLLO_EXPLORER_ENABLED === 'true',
    context: ctx => ctx,
  });

  await server.start();
  server.applyMiddleware({
    app,
    path: '/graphql',
    cors: { origin: true, credentials: true },
  });

  await new Promise<void>(resolve => httpServer.listen({ port: 4000 }, resolve));

  logger.info(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}
