import express from 'express';
import { methodNotAllowed } from '../utils/problem.util';
import { container, setup } from '../container';

setup();
const locationController = container.resolve('locationController');

const router = express.Router();

router.route('/location').get(locationController.get).all(methodNotAllowed);

export default router;
