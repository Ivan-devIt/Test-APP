import express, { Express } from 'express';
import cors from 'cors';
import { json } from 'body-parser';
import { config } from './utils';
import { router_v1 } from './routes';

const { PORT, HOST, PROTOCOL } = config;

const app: Express = express();

app.use(json());

// enable cors
app.use(cors());
app.options('*', cors());

// v1 api routes
app.use('/api/v1', router_v1);

export const server = {
  start: async (): Promise<void> => {
    await app.listen(PORT, () => {
      console.log(`⚡️[server]: Server is running at ${PROTOCOL}://${HOST}:${PORT}`);
    });
  },
};
