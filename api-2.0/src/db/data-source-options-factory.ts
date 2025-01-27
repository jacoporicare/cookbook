import { ConfigService } from '@nestjs/config';
import { DataSourceOptions, LogLevel } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export function dataSourceOptionsFactory(config: ConfigService): DataSourceOptions {
  const logging = config.get<string>('DB_LOGGING');

  return {
    type: 'postgres',
    host: config.get<string>('DB_HOST'),
    port: parseInt(config.get<string>('DB_PORT') ?? '5432', 10),
    username: config.get<string>('DB_USERNAME'),
    password: config.get<string>('DB_PASSWORD'),
    database: config.get<string>('DB_DATABASE'),
    entities: [__dirname + '/../modules/**/*.entity.{ts,js}'],
    migrations: [__dirname + '/../../migrations/*.{ts,js}'],
    synchronize: config.get<string>('DB_SYNCHRONIZE') === 'true',
    logging: logging ? (logging.split(',') as 'all' | LogLevel[]) : false,
    namingStrategy: new SnakeNamingStrategy(),
  };
}
