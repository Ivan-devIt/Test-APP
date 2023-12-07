import winston from 'winston';
// import config from '../../config/config';

interface LoggingInfo {
  level: string;
  message: string;
}

const enumerateErrorFormat = winston.format((info: LoggingInfo) => {
  if (info instanceof Error) {
    Object.assign(info, { message: info.stack });
  }
  return info;
});

const logger = winston.createLogger({
  // level: config.env === 'development' ? 'debug' : 'info', //TODO
  level: 'info',
  format: winston.format.combine(
    enumerateErrorFormat(),
    // config.env === 'development' ? winston.format.colorize() : winston.format.uncolorize(), //TODO
    winston.format.colorize(),
    winston.format.splat(),
    winston.format.printf((info: LoggingInfo) => `${info.level}: ${info.message}`),
  ),
  transports: [
    new winston.transports.Console({
      stderrLevels: ['error'],
    }),
  ],
});

export { logger };
