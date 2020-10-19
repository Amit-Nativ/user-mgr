import 'dotenv-extended/config';
import createApp from './config/express/index.js';
import logger from 'env-bunyan';

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
]);

export const close = () => {
  server.close();
};