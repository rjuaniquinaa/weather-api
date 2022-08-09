import Router from 'express-promise-router';
import { methodNotAllowed } from '../utils/problem.util';
import { container, setup } from '../container';

setup();
const locationController = container.resolve('locationController');
const weatherController = container.resolve('weatherController');

const router = Router();

router.route('/location').get(locationController.get).all(methodNotAllowed);
router
  .route('/current/:city?')
  .get(weatherController.getCurrentWeather)
  .all(methodNotAllowed);

router
  .route('/forecast/:city?')
  .get(weatherController.getExtendedWeather)
  .all(methodNotAllowed);

export default router;
