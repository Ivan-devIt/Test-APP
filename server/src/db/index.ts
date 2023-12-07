import * as mongoose from 'mongoose';
import { config } from '../utils';
import { logger } from '../modules/logger/logger';

const { DB_CONNECT } = config;

export const mongoDb = {
  connect: async (): Promise<void> => {
    await mongoose
      .connect(DB_CONNECT)
      .then(() => {
        logger.info('*** connected to mongodb was success ***');
      })
      .catch((err) => {
        logger.error(`mongodb connect error: ${err.message}`);
        throw new Error(`mongodb connect error: ${err.message}`);
      });
  },
};
