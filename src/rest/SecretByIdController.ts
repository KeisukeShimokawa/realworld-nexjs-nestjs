import { NextFunction } from 'connect';
import { Request, Response } from 'express';
import { UrlIdValidationError } from '../UrlIdValidationError';

export class SecretByIdController {
  retrieveSecretById(req: Request, res: Response, next: NextFunction) {
    if (req.params.urlId.length < 10) {
      next(new UrlIdValidationError('UrlIDが短すぎます'));
    }
  }
}
