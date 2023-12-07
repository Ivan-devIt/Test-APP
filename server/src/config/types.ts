import { E_Protocol } from '../types';

export type T_EnvsTypes = {
  NODE_ENV: string;
  PORT: number;
  HOST: string;
  PROTOCOL: E_Protocol;
  USER_NAME: string;
  USER_PASSWORD: string;
  MONGO_DB_USER_NAME: string;
  MONGO_DB_PASSWORD: string;
  MONGO_DB_PORT: number;
  MONGO_DB_HOST: string;
  MONGO_DB_NAME: string;
  BASE_USER: string;
  BASE_PASSWORD: string;
  BASE_EMAIL: string;
};
