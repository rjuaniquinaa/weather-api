export default (app) => {
  app.use((req, res, next) => {
    const { write, end } = res;

    const chunks = [];
    res.write = (...args) => {
      chunks.push(Buffer.from(args[0]));

      write.apply(res, args);
    };

    res.end = (...args) => {
      if (args[0]) {
        chunks.push(Buffer.from(args[0]));
      }

      const responseBody = Buffer.concat(chunks).toString('utf8');
      req.log.info(responseBody);

      end.apply(res, args);
    };

    next();
  });
};
