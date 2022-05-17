import { Application } from 'express';
import { Route } from '../Route';
import { SecretController } from './SecretController';

export class SecretRoute implements Route {
  constructor(private secretController: SecretController) {}

  mountRoute(application: Application): void {
    application
      .route('/api/v1/secrets')
      .post(this.secretController.storeSecret);
  }
}
