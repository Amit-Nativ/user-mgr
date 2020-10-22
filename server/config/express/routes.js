import { join } from 'path';
import createError from 'http-errors';
import apiRouter from '../../api';

export default app => {
  app.use('/api', apiRouter);

  app.get('/check', (req, res) => res.send('Hello World from Amit'))

  // All undefined api routes should return a 404
  app.route('/:url(api|auth)/*')
    .get((req, res, next) => {
      next(createError(404));
    });

  app.route('/*')
    .get((req, res) => res.sendFile(join(__dirname, '..', '..', '..', 'client', 'index.html')));
};
