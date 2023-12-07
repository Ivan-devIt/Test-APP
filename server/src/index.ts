import { server } from './app';
import { mongoDb } from './db';
import { logger } from './modules/logger';

const start = async (): Promise<void> => {
  try {
    //connect to mongodb
    await mongoDb.connect();

    //start server
    server.start();
  } catch (err) {
    server.close();
    logger.error(err);
  }
};

start();
