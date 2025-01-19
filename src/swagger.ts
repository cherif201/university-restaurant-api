// src/swagger.ts
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export function setupSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('restapi') // Replace with your API title
    .setDescription('Your API Description') // Replace with a short description
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
      'JWT-auth', // This name will be used in the @ApiBearerAuth() decorator
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
  
  /*document.security = [
    {
      'JWT-auth': [], // Applies the 'JWT-auth' scheme globally
    },
  ];*/
  SwaggerModule.setup('api', app, document); // Swagger UI will be accessible at /api
}
