import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'cookbook',
  password: 'cookbook',
  database: 'cookbook',
  synchronize: true,
  logging: 'all',
  entities: [__dirname + '/../modules/**/*.entity.{ts,js}'],
  migrations: [__dirname + '/../../migrations/*.{ts,js}'],
  namingStrategy: new SnakeNamingStrategy(),
});
