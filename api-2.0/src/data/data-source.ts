import { DataSource } from 'typeorm';

import { Recipe } from './entity/Recipe';

export const CookbookDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'cookbook',
  password: 'cookbook',
  database: 'cookbook',
  synchronize: true,
  logging: false,
  entities: [Recipe],
  migrations: [],
  subscribers: [],
});
