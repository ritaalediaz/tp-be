/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 🔓 Configuración de CORS explícita
  app.enableCors({
    origin: "http://localhost:5173", // 👈 tu frontend local
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3000);
  console.log(`🚀 Backend corriendo en http://127.0.0.1:${process.env.PORT ?? 3000}`);
}
bootstrap();
