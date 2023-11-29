import dotenv from 'dotenv';

dotenv.config();

// const DB_CONNECT = `mongodb://${process.env.DB_USER_NAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}`;
const DB_CONNECT = `mongodb://${process.env.DB_USER_NAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

export const config = {
  PORT: process.env.PORT || 8000,
  HOST: process.env.HOST || 'localhost',
  PROTOCOL: process.env.PROTOCOL || 'http',
  DB_USER_NAME: process.env.DB_PASSWORD,
  // DB_PORT: process.env.DB_PORT,
  // DB_HOST: process.env.DB_HOST,
  DB_NAME: process.env.DB_NAME,
  DB_CONNECT: DB_CONNECT,
  BASE_USER: process.env.BASE_USER,
  BASE_PASSWORD: process.env.BASE_PASSWORD,
  BASE_EMAIL: process.env.BASE_EMAIL,
};
