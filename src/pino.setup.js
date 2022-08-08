import pino from 'pino-http';

export default pino({
  formatters: {
    level: (label) => {
      return { level: label };
    },
  },
  level: process.env.LOG_LEVEL || 'info',
});
