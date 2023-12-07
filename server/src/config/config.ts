import Joi from 'joi';
import 'dotenv/config';
import { E_NodeEnvVariants, E_Protocol } from '../types';

const envVarsSchema = Joi.object()
  .keys({
    // SERVER
    NODE_ENV: Joi.string()
      .valid(E_NodeEnvVariants.production, E_NodeEnvVariants.development)
      .required()
      .description('Mode for starting the server'),
    PORT: Joi.number()
      .default(5000)
      .description('The port on which the server will start'),
    HOST: Joi.string()
      .default('localhost')
      .description('The domain on which the server will run'),
    PROTOCOL: Joi.string()
      .default(E_Protocol.http)
      .valid(E_Protocol.http, E_Protocol.https)
      .description('The protocol on which the server will run')
      .example(E_Protocol.http),
    // DEFAULT USER
    USER_NAME: Joi.string()
      .alphanum()
      .min(3)
      .max(30)
      .required()
      .description('Default user name')
      .example('Alan'),
    USER_PASSWORD: Joi.string()
      .min(8)
      .max(16)
      .required()
      .description('Default user password')
      .example('12345678'),
    // MONGO DB
    MONGO_DB_USER_NAME: Joi.string()
      .min(4)
      .max(30)
      .required()
      .description('Mongo db user name')
      .example('alan_89'),
    MONGO_DB_PASSWORD: Joi.string()
      .min(4)
      .max(30)
      .required()
      .description('Mongo db password')
      .example('123_sdadWWS'),
    MONGO_DB_PORT: Joi.number()
      .integer()
      .min(1000)
      .max(100000)
      .default(27017)
      .description('Mongo db port')
      .example(27017),
    MONGO_DB_HOST: Joi.string()
      .default('localhost')
      .description('Mongo db host')
      .example('localhost'),
    MONGO_DB_NAME: Joi.string()
      .min(4)
      .max(20)
      .description('Mongo db name')
      .example('events_app'),
    // BASE AUTH
    BASE_USER: Joi.string()
      .alphanum()
      .min(4)
      .max(30)
      .required()
      .description('Base user name')
      .example('admin'),
    BASE_PASSWORD: Joi.string()
      .min(8)
      .max(16)
      .required()
      .description('Base user password')
      .example('123123432'),
    BASE_EMAIL: Joi.string()
      .email()
      .required()
      .description('Base user email')
      .example('example@gmail.com'),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema
  .prefs({ errors: { label: 'key' } })
  .validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export const config = {
  NODE_ENV: envVars.NODE_ENV,
  PORT: envVars.PORT,
  HOST: envVars.HOST,
  PROTOCOL: envVars.PROTOCOL,
  USER_NAME: envVars.USER_NAME,
  USER_PASSWORD: envVars.USER_PASSWORD,
  MONGO_DB_CONNECT: `mongodb://${envVars.MONGO_DB_USER_NAME}:${envVars.MONGO_DB_PASSWORD}@${envVars.MONGO_DB_HOST}:${envVars.MONGO_DB_PORT}/${envVars.MONGO_DB_NAME}`,
  BASE_USER: envVars.BASE_USER,
  BASE_PASSWORD: envVars.BASE_PASSWORD,
  BASE_EMAIL: envVars.BASE_EMAIL,
};
