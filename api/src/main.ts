import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FileLoggingExceptionFilter } from './common/filters/file-logging-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new FileLoggingExceptionFilter());
  await app.listen(Number(process.env.PORT) || 1239);
}
bootstrap();
