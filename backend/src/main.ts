import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';

config();

async function bootstrap() {
  console.log(process.env.DB_PASSWORD);

  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
