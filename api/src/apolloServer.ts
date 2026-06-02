import http from 'http';

import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageProductionDefault,
} from '@apollo/server/plugin/landingPage/default';
import { expressMiddleware } from '@as-integrations/express4';
import { IExecutableSchemaDefinition } from '@graphql-tools/schema';
import cors from 'cors';
import express, { Request } from 'express';

import { imageUploadMiddleware } from './imageUpload';
import logger from './logger';
import { recipeImageMiddleware } from './recipeImage';

export type Context = {
  req: Request;
};

export async function startApolloServer(
  typeDefs: IExecutableSchemaDefinition['typeDefs'],
  resolvers: IExecutableSchemaDefinition['resolvers'],
) {
  const app = express();
  app.get('/health', (_req, res) => res.send('ok'));
  app.use(recipeImageMiddleware());
  app.use(imageUploadMiddleware());

  const httpServer = http.createServer(app);

  const server = new ApolloServer<Context>({
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
  });

  await server.start();

  app.use(
    '/graphql',
    cors<cors.CorsRequest>({ origin: true, credentials: true }),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => ({ req }),
    }),
  );

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4000 }, resolve),
  );

  logger.info('🚀 Server ready at http://localhost:4000/graphql');
}
