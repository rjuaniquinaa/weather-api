import { asyncLocalStorage } from '../utils/locals.util';

export default (app) => {
  app.use((_, res, next) => {
    asyncLocalStorage.run(res, next);
  });
};
