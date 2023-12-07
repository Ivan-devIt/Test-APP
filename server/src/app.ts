import express, { Express } from 'express';
import cors from 'cors';
import { json } from 'body-parser';
import { config } from './utils';
import { logger } from './modules/logger/logger';
import { router_v1 } from './routes';
import { E_RoutesVersion, E_Routes } from './routes/v1/types';
import { ApiError, errorConverter, errorHandler } from './modules/errors';
import httpStatus from 'http-status';

const { PORT, HOST, PROTOCOL } = config;

const app: Express = express();

app.use(json());

// enable cors
app.use(cors());
app.options('*', cors());

//use v1 api routes
app.use(`/${E_Routes.api}/${E_RoutesVersion.v1}`, router_v1);

// send back a 404 error for any unknown api request
app.use((_req, _res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

export const server = {
  //start server
  start: async (): Promise<void> => {
    app.listen(PORT, () => {
      logger.info(`⚡️[server]: Server is running at ${PROTOCOL}://${HOST}:${PORT}`);
    });
  },

  //close server //TODO
  close: (): never => {
    logger.info('⚡️ Server closed ⚡️');
    process.exit(1);
  },
};

//TODO
const exitHandler = (): void => {
  if (server) {
    server.close();
  } else {
    process.exit(1);
  }
};

//TODO
const unexpectedErrorHandler = (error: string): void => {
  logger.error(error);
  exitHandler();
};

//TODO
process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});
