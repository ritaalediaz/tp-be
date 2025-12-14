/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 🔓 Configuración de CORS para producción y desarrollo
  app.enableCors({
    origin: [
      "https://pizza-conmigo1.onrender.com", // 👈 tu frontend deployado
      "http://localhost:5173"                // 👈 tu frontend local
    ],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  });

  // ✅ Validaciones globales
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
  console.log(`🚀 Backend corriendo en http://127.0.0.1:${process.env.PORT ?? 3000}`);
}
bootstrap();
