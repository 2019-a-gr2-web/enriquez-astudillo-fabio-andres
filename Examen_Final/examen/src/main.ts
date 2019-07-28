import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {NestExpressApplication} from "@nestjs/platform-express";
import {join} from "path";
import * as cookieParser from 'cookie-parser'
import * as express from 'express';
import * as path from 'path';
import * as favicon from 'serve-favicon';
import * as session from 'express-session';
const FileStore = require('session-file-store')(session); 

async function bootstrap() {
  
  const app = await NestFactory.create(AppModule) as NestExpressApplication;

  //icono
  app.use(
    favicon(
      path.join(
        __dirname, '..','public','images','dino.ico'
      )
    )
  );
  //cookie segura
  app.use(
    cookieParser('Secreto')
  );
  //views
  app.setViewEngine('ejs');

  app.setBaseViewsDir(
    join(__dirname, '..', 'views')
  );
  //carpeta publica
  app.use(
    express.static('public')
  );
  //sesión
  app.use(
    session({
      name: 'server-session-id',
      secret: 'No sera de tomar un traguito',
      resave: false,
      saveUninitialized: true,
      cookie: {
          secure: false
      },
      store: new FileStore()
    })
  );
  //puerto
  await app.listen(3000);
}
bootstrap();
