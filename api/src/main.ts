import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FileLoggingExceptionFilter } from './common/filters/file-logging-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.useGlobalFilters(new FileLoggingExceptionFilter());

  const config = new DocumentBuilder()
    .setTitle('Finança Fácil API')
    .setDescription('The Finança Fácil API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(Number(process.env.PORT) || 1239);
}
bootstrap();
