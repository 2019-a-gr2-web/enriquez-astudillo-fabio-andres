import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import express = require('express');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(express.static('public'));
  await app.listen(3000);
}
bootstrap();
