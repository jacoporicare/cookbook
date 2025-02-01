import { join } from 'path';

import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './auth/auth.module';
import { CookbookConfigModule } from './config.module';
import { RecipeModule } from './recipe/recipe.module';

import { Config } from '@/config';
import { RunContextModule } from '@/core/run-context/run-context.module';
import { dataSourceOptionsFactory } from '@/db/data-source-options-factory';

@Module({
  imports: [
    RunContextModule,
    CookbookConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [CookbookConfigModule],
      useFactory: dataSourceOptionsFactory,
      inject: [Config],
    }),
    AuthModule,
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [CookbookConfigModule],
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
