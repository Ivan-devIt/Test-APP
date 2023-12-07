import * as mongoose from 'mongoose';
import { logger } from '../../modules/logger/logger';
import { config } from '../../config';

const { MONGO_DB_CONNECT } = config;

export const mongoDb = {
  connect: async (): Promise<void> => {
    await mongoose
      .connect(MONGO_DB_CONNECT)
      .then(() => {
        logger.info('*** connected to mongodb was success ***');
      })
      .catch((err) => {
        logger.error(`mongodb connect error: ${err.message}`);
        throw new Error(`mongodb connect error: ${err.message}`);
      });
  },
};
