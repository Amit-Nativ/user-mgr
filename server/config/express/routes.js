import { join } from 'path';
import createError from 'http-errors';
import apiRouter from '../../api';

export default app => {
  app.use('/api', apiRouter);

  // All undefined api routes should return a 404
  app.route('/:url(api|auth)/*')
    .get((req, res, next) => {
      next(createError(404));
    });

  app.route('/*')
    .get((req, res) => res.sendFile(join(__dirname, '..', '..', '..', 'client', 'index.html')));
};
