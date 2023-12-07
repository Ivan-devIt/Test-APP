import { server } from './app';
import { mongoDb } from './db';

const start = async (): Promise<void> => {
  try {
    //connect to mongodb
    await mongoDb.connect();

    //start server
    server.start();
  } catch (err) {
    console.error(err);
  }
};

start();
