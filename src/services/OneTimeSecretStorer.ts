import { Secret } from '../domain/models/Secret';
import { UrlId } from '../domain/models/UrlId';
import { SecretStorer } from './SecretStorer';
import { TokenGenerator } from './TokenGenerator';

export class OneTimeSecretStorer implements SecretStorer {
  constructor(
    private tokenGenerator: TokenGenerator
  ) {}

  async storeSecretAndUrlId(secret: Secret): Promise<UrlId> {
    // generate a token for urlId
    const token = this.tokenGenerator.generateToken();

    // create a urlId

    // store both

    // return urlId only
  }
}
