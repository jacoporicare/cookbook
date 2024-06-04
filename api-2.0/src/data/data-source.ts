import { strict as assert } from 'node:assert/strict';

import { DataSource, LogLevel } from 'typeorm';

import { Image } from './entity/Image';
import { Ingredient } from './entity/Ingredient';
import { Recipe } from './entity/Recipe';
import { RecipeCooked } from './entity/RecipeCooked';
import { RecipeIngredient } from './entity/RecipeIngredient';
import { Tag } from './entity/Tag';
import { User } from './entity/User';

const { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_DATABASE, DB_LOGGING } = process.env;

assert(DB_HOST);
assert(DB_USERNAME);
assert(DB_PASSWORD);
assert(DB_DATABASE);

const port = Number(DB_PORT);
const logging = DB_LOGGING ? (DB_LOGGING.split(',') as 'all' | LogLevel[]) : false;

export const CookbookDataSource = new DataSource({
  type: 'postgres',
  host: DB_HOST,
  port: !Number.isNaN(port) ? port : 5432,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  synchronize: process.env.NODE_ENV !== 'production',
  logging,
  entities: [Recipe, Ingredient, RecipeIngredient, User, RecipeCooked, Image, Tag],
  migrations: [],
  subscribers: [],
});
