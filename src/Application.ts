import express from 'express';

export class Application {
  private expressApplication: express.Application = express();

  getExpressApplication(): express.Application {
    return this.expressApplication;
  }
}
