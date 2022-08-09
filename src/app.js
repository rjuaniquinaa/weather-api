import express from 'express';
import helmet from 'helmet';
import noCacheMiddleware from './middlewares/no-cache.middleware';
import errorHandlerMiddleware from './middlewares/error-handler.middleware';
import localsMiddleware from './middlewares/locals.middleware';
import responseBodyMiddleware from './middlewares/response-body.middleware';
import router from './routes';
import logger from './pino.setup';

const app = express();

// app.set('trust proxy', true);
app.use(logger);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(noCacheMiddleware());
responseBodyMiddleware(app);
localsMiddleware(app);
app.use('/v1', router);
errorHandlerMiddleware(app);

export default app;
