import 'module-alias/register';
import express, { Express } from 'express';
import cors from 'cors';
import { json, urlencoded } from 'body-parser';
import { config } from './config';
import { router_v1 } from './routes';
import { E_RoutesVersion, E_Routes } from './routes/v1/types';
import { ApiError, errorConverter, errorHandler, logger } from './utils';
import httpStatus from 'http-status';
import morgan from 'morgan';

const { PORT, HOST, PROTOCOL } = config;

const app: Express = express();

// Use body parser to read sent json payloads
app.use(
  urlencoded({
    extended: true,
  }),
);
app.use(json());

// enable cors
app.use(cors());
app.options('*', cors());

//show request logs
app.use(morgan('tiny'));

//add public folder
app.use(express.static('public'));

// add swagger api
// app.use(
//   `/${E_Routes.swaggerApi}`,
//   swaggerUi.serve,
//   swaggerUi.setup(undefined, {
//     swaggerOptions: {
//       url: '/swagger.json',
//     },
//   }),

// );

//use v1 api routes
app.use(`/${E_Routes.api}/${E_RoutesVersion.v1}`, router_v1);

// send back a 404 error for any unknown api request
app.use((_req, _res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, `Not found request: '${_req.url}'`));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

export const server = {
  //start server
  start: async (): Promise<void> => {
    app.listen(PORT, () => {
      logger.info(
        `⚡️[server]: Server is running at ${PROTOCOL}://${HOST}:${PORT}`,
      );
    });
  },

  //close server //TODO
  close: (): never => {
    logger.info('⚡️ Server closed ⚡️');
    process.exit(1);
  },
};

// //TODO
// const exitHandler = (): void => {
//   if (server) {
//     server.close();
//   } else {
//     process.exit(1);
//   }
// };

// //TODO
// const unexpectedErrorHandler = (error: string): void => {
//   logger.error(error);
//   exitHandler();
// };

// //TODO
// process.on('uncaughtException', unexpectedErrorHandler);
// process.on('unhandledRejection', unexpectedErrorHandler);

// process.on('SIGTERM', () => {
//   logger.info('SIGTERM received');
//   if (server) {
//     server.close();
//   }
// });
