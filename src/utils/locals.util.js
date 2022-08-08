const { AsyncLocalStorage } = require('async_hooks');

export const asyncLocalStorage = new AsyncLocalStorage();

export const getLocals = () => {
  const res = asyncLocalStorage.getStore();

  return { ...res.app.locals, request: res.req, ...res.locals };
};
