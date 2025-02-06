import { join } from 'path';

import { ConfigModule } from '@applifting-io/nestjs-decorated-config';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './auth/auth.module';
import { RecipeModule } from './recipe/recipe.module';

import { Config } from '@/config';
import { RunContextModule } from '@/core/run-context/run-context.module';
import { dataSourceOptionsFactory } from '@/db/data-source-options-factory';

@Module({
  imports: [
    RunContextModule,
    ConfigModule.forRootAsync(Config),
    TypeOrmModule.forRootAsync({
      useFactory: dataSourceOptionsFactory,
      inject: [Config],
    }),
    AuthModule,
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useFactory: (config: Config) => ({
        autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
        playground: config.graphqlPlayground,
        context: ({ req }: any) => ({ headers: req.headers }),
      }),
      inject: [Config],
    }),
    RecipeModule,
    // StorageModule,
    // AuthModule,
  ],
})
export class AppModule {}
