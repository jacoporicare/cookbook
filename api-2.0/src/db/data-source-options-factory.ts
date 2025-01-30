import { DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

import { Config } from '@/config';

export function dataSourceOptionsFactory(config: Config): DataSourceOptions {
  return {
    type: 'postgres',
    host: config.dbHost,
    port: config.dbPort,
    username: config.dbUsername,
    password: config.dbPassword,
    database: config.dbDatabase,
    entities: [__dirname + '/../modules/**/*.entity.{ts,js}'],
    migrations: [__dirname + '/../../migrations/*.{ts,js}'],
    synchronize: config.dbSynchronize,
    logging: config.dbLogging,
    namingStrategy: new SnakeNamingStrategy(),
  };
}
