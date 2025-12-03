
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [
      "https://pizza-conmigo1.onrender.com", // URL pública de tu frontend
      "http://localhost:5173"                // para desarrollo local
    ],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // ponelo en true si usás cookies o auth
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
