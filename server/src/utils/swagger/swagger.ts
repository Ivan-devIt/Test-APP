import { Express, Request, Response } from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { version } from '../../../package.json';
import { logger } from '../logger';
import { E_Routes, E_RoutesVersion } from '../../routes/v1/types';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'REST API Docs',
      version,
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['../../routes/v1/index.ts', '../../modules/**/*.model.ts'],
};

const swaggerSpec = swaggerJsdoc(options);

const swaggerPath = `/${E_Routes.api}/${E_RoutesVersion.v1}/${E_Routes.docs}`;

const swaggerDocs = (app: Express, port: number): void => {
  // Swagger page
  app.use(swaggerPath, swaggerUi.serve, swaggerUi.setup(swaggerSpec)); //TODO

  // Docs in JSON format
  app.get(`/docs.json`, (req: Request, res: Response) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });

  logger.info(`Docs available at http://localhost:${port}${swaggerPath}`); //TODO
};

export { swaggerDocs };
