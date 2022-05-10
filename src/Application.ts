import express from 'express';
import { Route } from './Route';

export class Application {
  private expressApplication: express.Application = express();

  constructor(private routeList: Route[]) {
  }

  getExpressApplication(): express.Application {
    return this.expressApplication;
  }
}
