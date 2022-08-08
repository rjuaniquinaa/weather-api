import express from 'express';
import { methodNotAllowed } from '../utils/problem.util';

const router = express.Router();

router
  .route('/test')
  .get((req, res) => {
    res.send('Hello');
  })
  .all(methodNotAllowed);

export default router;
