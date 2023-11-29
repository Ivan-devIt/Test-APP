import { server } from './app';
import { mongoDb } from './db';

const start = async (): Promise<void> => {
  try {
    await mongoDb.connect();
    server.start();
  } catch (err) {
    console.error(err);
  }
};

start();
