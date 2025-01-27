import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';

// import { AuthModule } from './modules/auth/auth.module';
// import { RecipeModule } from './modules/recipe/recipe.module';
// import { StorageModule } from './modules/storage/storage.module';

import { RecipeModule } from './recipe/recipe.module';

import { dataSourceOptionsFactory } from '@/db/data-source-options-factory';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        autoSchemaFile: true,
        sortSchema: true,
        playground: config.get<string>('GRAPHQL_PLAYGROUND') === 'true',
        context: ({ req }: any) => ({ headers: req.headers }),
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: dataSourceOptionsFactory,
      inject: [ConfigService],
    }),
    RecipeModule,
    // StorageModule,
    // AuthModule,
  ],
})
export class AppModule {}
