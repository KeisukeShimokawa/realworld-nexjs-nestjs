import { NextFunction } from 'connect';
import { Request, Response } from 'express';

export class SecretController {
  constructor() {}

  async storeSecret(req: Request, res: Response, next: NextFunction) {
    console.log('hi');
    throw new Error('method not implemented yet');
  }
}
