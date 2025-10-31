import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // --- Swagger Config ---
  const config = new DocumentBuilder()
    .setTitle('Lucky Pets API')
    .setDescription('API para agendamentos, pets e usuários')
    .setVersion('1.0')
    .addBearerAuth() // adiciona suporte ao JWT no Swagger
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: { persistAuthorization: true },
  });

  app.useGlobalPipes(new ValidationPipe());

  const PORT = process.env.PORT ?? 3000
  await app.listen(PORT);
  console.log(`🚀 Server running on: http://localhost:${PORT}`);
  console.log(`📘 Swagger Docs: http://localhost:${PORT}/api/docs`);
}
bootstrap();
