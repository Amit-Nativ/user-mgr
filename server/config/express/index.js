import { join, resolve } from 'path';
import routes from './routes.js';
import express from 'express';
import morgan from 'morgan';
import compression from 'compression';
import bodyparser from 'body-parser';
import methodOverride from 'method-override';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import helmet from 'helmet';
import mongooseErrors from 'express-mongoose-errors';
import jsonErrorHandler from 'express-json-error-handler';
import inProduction from 'in-production';
import logger from '../logger';
import staticGzip from 'express-static-gzip';
import cors from 'cors';

export default () => {
  const app = express();

  app.use(cors())
  app.use(helmet());
  app.use(bodyparser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));
  app.use(bodyparser.json({ limit: '50mb' }));
  app.use(methodOverride());
  app.use(cookieParser());
  app.use(passport.initialize());
  app.use(passport.session());

  app.use(express.static(join(__dirname, "../../../client")));
  // app.use(staticGzip( '../../../client'));
  app.use(compression());

  if (!inProduction) {
    app.use(morgan('dev'));
  }

  routes(app);

  app.use(mongooseErrors());
  app.use(jsonErrorHandler({
    log({ err, req, res }) {
      logger.error({ err, req, res });
    }
  }));

  return app;
};