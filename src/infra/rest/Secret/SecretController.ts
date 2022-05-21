import { NextFunction } from 'connect';
import { Request, Response } from 'express';
import { Secret } from '../../../domain/models/Secret';
import { RequestValidationError } from './RequestValidationError';

export class SecretController {
  constructor() {}

  async storeSecret(req: Request, res: Response, next: NextFunction) {
    console.log('req', req.body);

    try {
      if (!req.body?.secret)
        throw new RequestValidationError('Request body format is not valid');

      if (typeof req.body?.secret !== 'string')
        throw new RequestValidationError('Secret is not a string');

      const secret = new Secret(req.body.secret);
    } catch (error) {
      next(error);
    }
  }
}
