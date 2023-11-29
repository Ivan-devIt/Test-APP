import * as mongoose from 'mongoose';
import { config } from '../utils';

const { DB_CONNECT } = config;

console.log('===DB_CONNECT===', DB_CONNECT);

export const mongoDb = {
  connect: async (): Promise<void> => {
    await mongoose
      .connect(DB_CONNECT)
      .then(() => {
        console.log('\n  *** connected to mongodb was success *** \n');
      })
      .catch((err) => {
        throw new Error(` mongodb connect error: ${err.message}`);
      });
  },
};
