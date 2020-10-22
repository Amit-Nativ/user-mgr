import 'dotenv-extended/config';
import "regenerator-runtime";
import createApp from './config/express/index.js';
import logger from './config/logger';

export const app = createApp();

export let server;

const expressStarted = new Promise(resolve => {
  server = app.listen(process.env.PORT, () => {
    logger.info('Express listening on port %s', process.env.PORT);
    resolve();
  });
});

export const started = Promise.all([
  expressStarted
]).catch(err => logger.error(err));

export const close = () => {
  server.close();
};