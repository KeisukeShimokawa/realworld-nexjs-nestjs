import { NextFunction } from 'connect';
import { Request, Response } from 'express';
import { SecretRetriver } from '../SecretRetriver';
import { UrlId } from '../UrlId';

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
