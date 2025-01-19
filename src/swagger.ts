// src/swagger.ts
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export function setupSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('restapi') 
    .setDescription('Your API Description') 
    .setVersion('1.0')
    // Add security configuration for Bearer Auth (JWT)
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth', 
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  document.components.securitySchemes = {
    ...document.components.securitySchemes,
    default: {
      type: 'http',
      scheme: 'bearer',
      name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      }
    },
  SwaggerModule.setup('api', app, document); // Swagger UI will be accessible at /api
}
