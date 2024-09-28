import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

import * as entities from './entities';

export const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'cookbook',
  password: 'cookbook',
  database: 'cookbook',
  synchronize: true,
  logging: 'all',
  entities: Object.values(entities),
  migrations: [],
  subscribers: [],
  namingStrategy: new SnakeNamingStrategy(),
});
