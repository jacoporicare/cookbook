import log4js from 'log4js';

log4js.configure({
  appenders: {
    out: { type: 'stdout' },
    // app: { type: 'file', filename: 'log/app.log' },
  },
  categories: {
    default: { appenders: ['out'], level: 'debug' },
    imagesGenerator: { appenders: ['out'], level: 'debug' },
  },
});

const logger = log4js.getLogger(process.env.LOGGER_CATEGORY);

export default logger;
