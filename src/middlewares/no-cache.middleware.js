import noCache from 'nocache';

/**
 * noCache middleware.
 */
export default () => (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next();
  }

  noCache()(req, res, next);
};
