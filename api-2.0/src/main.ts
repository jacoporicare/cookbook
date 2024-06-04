import 'dotenv/config';

import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { CookbookDataSource } from './data/data-source';

async function bootstrap() {
  await CookbookDataSource.initialize();
  const app = await NestFactory.create(AppModule);
  await app.listen(4000);
}
bootstrap();
