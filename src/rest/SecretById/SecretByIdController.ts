import { NextFunction } from 'connect';
import { Request, Response } from 'express';
import { SecretRetriver } from '../../services/SecretRetriver';
import { UrlId } from '../../domain/UrlId';

export class SecretByIdController {
  constructor(private secretRetriever: SecretRetriver) {}

  async retrieveSecretById(req: Request, res: Response, next: NextFunction) {
    try {
      const urlId = new UrlId(req.params.urlId);
      const secret = await this.secretRetriever.retrieveSecretById(urlId);
    } catch (error) {
      next(error);
    }
  }
}
