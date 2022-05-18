import { NextFunction } from 'connect';
import { Request, Response } from 'express';
import { RequestValidationError } from './RequestValidationError';

export class SecretController {
  constructor() {}

  async storeSecret(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.body)
        throw new RequestValidationError('Request body is not provided');
    } catch (error) {
      next(error);
    }
  }
}
