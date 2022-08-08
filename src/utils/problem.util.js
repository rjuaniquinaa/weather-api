import Problem from 'api-problem';
import { getLocals } from './locals.util';

export const throwProblem = (problemDetail) => {
  const {
    request: { originalUrl },
  } = getLocals();

  problemDetail.instance = originalUrl;
  throw new Problem(problemDetail.status, problemDetail);
};

export const methodNotAllowed = (req, res, next) => {
  const { originalUrl: instance } = req;

  throw new Problem(405, {
    detail: `Method Not Allowed: ${req.method}`,
    instance,
  });
};
