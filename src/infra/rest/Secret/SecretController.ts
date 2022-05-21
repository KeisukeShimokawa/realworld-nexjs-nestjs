import { NextFunction } from 'connect';
import { Request, Response } from 'express';
import { RequestValidationError } from './RequestValidationError';

export class SecretController {
  constructor() {}

  async storeSecret(req: Request, res: Response, next: NextFunction) {
    console.log('req', req.body);

    try {
      // if (req.body && Object.keys(req.body).length === 0)
      if (!req.body)
        throw new RequestValidationError('Request body is not provided');

      if (!req.body?.secret)
        throw new RequestValidationError('Request body format is not valid');
    } catch (error) {
      next(error);
    }
  }
}
