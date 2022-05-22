import express from 'express';
import { errorHandler } from '../rest/middlewares/ErrorHandler';
import { Route } from './Route';

export class Application {
  private expressApp: express.Application = express();

  constructor(private routeList: Route[]) {
    this.expressApp.use(express.json());
    this.expressApp.use(express.urlencoded({ extended: true }));
    this.routeList.forEach((route) => route.mountRoute(this.expressApp));
    this.expressApp.use(errorHandler);
  }

  getExpressApplication(): express.Application {
    return this.expressApp;
  }
}
