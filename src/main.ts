import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { RabbitMQService } from './modules/rabbitmq/rabbitmq.service';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { dot } from 'node:test/reporters';
import * as session from 'express-session';
import * as passport from  'passport';
import tracer from 'dd-trace';

async function bootstrap() {
  dotenv.config()
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('virtual event management system')
    .setDescription(' API description')
    .setVersion('1.0')
    .addTag('management')
    .addApiKey(
      {
        type: 'apiKey',
        in: 'header',
        name: 'Authorization',
      },
      'basic',
      )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  // app.useGlobalPipes(new ValidationPipe());
  // app.use(
  //   session({
  //     secret: 'my-secret',
  //     resave: false,
  //     saveUninitialized: false,
  //   }),
  // );
  // app.use(passport.initialize());
  // app.use(passport.session());
  await app.listen(process.env.DB_PORT);
  const rabbitMQService = app.get(RabbitMQService);
  await rabbitMQService.connect(); 


  // const tracer = ddTrace.init({
  //   logInjection: true,
  //   runtimeMetrics: true,
  //   serviceName: 'my-nest-service',
  //   apiKey: 'c11303bb3675b0b9e635a0f6db1e2414876b2048',
  //   // Add more configuration options as needed
  // });
  tracer.init({
    env: 'c11303bb3675b0b9e635a0f6db1e2414876b2048',
    service: 'myservice',
    runtimeMetrics: true,
    logInjection: true,
  });
  
}
bootstrap();

