import express, { Express, Request, Response } from 'express';
import { json } from 'body-parser';
import { config } from './utils';

const { PORT, HOST, PROTOCOL } = config;

const app: Express = express();

app.use(json());

app.get('/', (req: Request, res: Response) => {
  res.send('Express + @777TypeScript Server !');
});

export const server = {
  start: async (): Promise<void> => {
    await app.listen(PORT, () => {
      console.log(`⚡️[server]: Server is running at ${PROTOCOL}://${HOST}:${PORT}`);
    });
  },
};
