import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';

// import { AuthModule } from './modules/auth/auth.module';
// import { RecipeModule } from './modules/recipe/recipe.module';
// import { StorageModule } from './modules/storage/storage.module';

import { CookbookConfigModule } from './config.module';
import { RecipeModule } from './recipe/recipe.module';

import { Config } from '@/config';
import { dataSourceOptionsFactory } from '@/db/data-source-options-factory';

@Module({
  imports: [
    CookbookConfigModule,
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [CookbookConfigModule],
      useFactory: (config: Config) => ({
        autoSchemaFile: true,
        sortSchema: true,
        playground: config.graphqlPlayground,
        context: ({ req }: any) => ({ headers: req.headers }),
      }),
      inject: [Config],
    }),
    TypeOrmModule.forRootAsync({
      imports: [CookbookConfigModule],
      useFactory: dataSourceOptionsFactory,
      inject: [Config],
    }),
    RecipeModule,
    // StorageModule,
    // AuthModule,
  ],
})
export class AppModule {}
