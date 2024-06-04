import { strict as assert } from 'node:assert';

import { DataSourceOptions, LogLevel } from 'typeorm';

import { Ingredient } from './ingredient/entities/ingredient.entity';
import { RecipeCooked } from './recipe/entities/recipe-cooked.entity';
import { RecipeImage } from './recipe/entities/recipe-image.entity';
import { RecipeIngredient } from './recipe/entities/recipe-ingredient.entity';
import { Recipe } from './recipe/entities/recipe.entity';
import { User } from './user/entities/user.entity';

const { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_DATABASE, DB_LOGGING } = process.env;

assert(DB_HOST);
assert(DB_USERNAME);
assert(DB_PASSWORD);
assert(DB_DATABASE);

const port = Number(DB_PORT);
const logging = DB_LOGGING ? (DB_LOGGING.split(',') as 'all' | LogLevel[]) : false;

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: DB_HOST,
  port: !Number.isNaN(port) ? port : 5432,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  synchronize: process.env.NODE_ENV !== 'production',
  logging,
  entities: [Recipe, Ingredient, RecipeIngredient, User, RecipeCooked, RecipeImage],
  migrations: [],
  subscribers: [],
};
