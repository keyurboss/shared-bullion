/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/data-server-app.module';
import { AppConfig } from './app/env/App.config';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  const config = app.get(AppConfig);

  app.setGlobalPrefix(globalPrefix);
  const port = config.port;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
