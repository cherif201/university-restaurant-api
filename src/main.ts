import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  /*app.setGlobalPrefix('api');*/

  // Swagger Setup
  const config = new DocumentBuilder()
    .setTitle('REST0pi')
    .setDescription('a university restaurant API documentation')
    .setVersion('1.0')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      name: 'Authorization',
      description: 'Enter JWT token',
      in: 'header',
    }, 
    'access-token'
  )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  document.components.securitySchemes = {
    ...document.components.securitySchemes,
    default: {
      type: 'http',
      scheme: 'bearer',
    },
  };

  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,     // strip unknown properties
    forbidNonWhitelisted: true, // throw error if unknown properties
    transform: true,     // automatically transform payloads to DTO instances
  }));
  await app.listen(3000);
}
bootstrap();
