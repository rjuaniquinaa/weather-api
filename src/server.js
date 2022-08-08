import config from './config';
import app from './app';

app.listen(config.port, () =>
  console.log(`I'm ready, let's rock! (pid: ${process.pid})`),
);
