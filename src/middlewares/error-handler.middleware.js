import createError from 'http-errors';
import Problem from 'api-problem';
/**
 * Error Handler middleware.
 * @param {Object} app - The Express app object.
 */
export default (app) => {
  app.use((err, req, res, next) => {
    if (res.headersSent) {
      return next(err);
    }

    // Only print errors for local environment
    if (process.env.NODE_ENV === 'local') {
      console.error('LOCAL', err);
    }

    if (err instanceof Problem) {
      return err.send(res);
    }

    if (err.isAxiosError && err.response) {
      err.status = err.response.status;
      err.stack += ` ${JSON.stringify(err.response.data)}`;
    } else if (err.error?.isJoi) {
      err = createError(400, err.error.toString());
    } else {
      // TODO: map err.code to different HTTP status codes
      // TODO: is this sufficient?:
      // err = createError(err.code)
      err = createError(err.status || 500, 'Unexpected error');
    }

    const problem = new Problem(err.status, err.name, {
      detail: err.message,
      instance: req.originalUrl,
    });
    problem.stack = err.stack;
    // Set status for missing routes when JWT is enabled.
    res.status(err.status).json(problem);
  });

  // Assume 404 since no middleware responded
  app.use((req, res, _) => {
    new Problem(404, {
      title: 'The requested URL was not found on this server',
      instance: req.originalUrl,
    }).send(res);
  });
};
