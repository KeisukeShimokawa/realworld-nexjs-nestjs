import { NextFunction } from 'connect';
import { Request, Response } from 'express';
import { SecretRetriver } from '../../../services/SecretRetriver';
import { UrlId } from '../../../domain/models/UrlId';

export class SecretByIdController {
  constructor(private secretRetriever: SecretRetriver) {
    /**
     * Routeで関数をExpressに設定する時に、thisのコンテキストが想定したものからずれる
     * そのため、以下のリンクを参考にインスタンス生成時にコンテキストを固定する
     *
     * https://stackoverflow.com/questions/4011793/this-is-undefined-in-javascript-class-methods
     */
    this.retrieveSecretById = this.retrieveSecretById.bind(this);
  }

  async retrieveSecretById(req: Request, res: Response, next: NextFunction) {
    try {
      const urlId = new UrlId(req.params.urlId);
      const secret = await this.secretRetriever.retrieveSecretById(urlId);
    } catch (error) {
      next(error);
    }
  }
}
