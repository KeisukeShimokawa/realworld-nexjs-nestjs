import { NextFunction } from 'connect';
import { Request, Response } from 'express';
import { UrlId } from '../UrlId';

export class SecretByIdController {

  async retrieveSecretById(req: Request, res: Response, next: NextFunction) {
    try {
      const urlId = new UrlId(req.params.urlId);
    } catch (error) {
      next(error);
    }
  }
}
