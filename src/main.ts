import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { METHODS } from 'http';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors(); // 🔓 Esto permite que React se conecte
  await app.listen(process.env.PORT ?? 3000);

  app.enableCors({
    origin: ["https://pizza-conmigo1.onrender.com",
      "http://localhost:3000"], 
      METHODS: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials:false,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
