import { Secret } from '../domain/models/Secret';
import { UrlId } from '../domain/models/UrlId';
import { SecretStorer } from './SecretStorer';

export class OneTimeSecretStorer implements SecretStorer {
  constructor() {}

  async storeSecretAndUrlId(secret: Secret): Promise<UrlId> {
    // generate a token for urlId
    // create a urlId
    // store both
    // return urlId only
  }
}
