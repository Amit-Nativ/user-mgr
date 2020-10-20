import { join, resolve } from 'path';
import routes from './routes.js';
import express from 'express';
import morgan from 'morgan';
import bodyparser from 'body-parser';
import helmet from 'helmet';
import inProduction from 'in-production';
import cors from 'cors';

export default () => {
  const app = express();

  app.use(cors())
  app.use(helmet());
  app.use(bodyparser.urlencoded({ extended: false }));
  app.use(bodyparser.json());
  // app.use(methodOverride());

  app.use(express.static(join(__dirname, "../../../client")));
  // app.use(staticGzip( '../../../client'));
  // app.use(compression());

  if (!inProduction) {
    app.use(morgan('dev'));
  }

  routes(app);

  return app;
};