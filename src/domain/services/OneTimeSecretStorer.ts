import { Secret } from '../models/Secret';
import { UrlId } from '../models/UrlId';
import { SecretRepository } from '../../infra/repositories/SecretRepository';
import { SecretStorer } from './SecretStorer';
import { TokenGenerator } from '../../infra/externalServices/TokenGenerator';

export class OneTimeSecretStorer implements SecretStorer {
  constructor(
    private secretRepository: SecretRepository,
    private tokenGenerator: TokenGenerator
  ) {}

  async storeSecretAndUrlId(secret: Secret): Promise<UrlId> {
    // generate a token for urlId
    const token = this.tokenGenerator.generateToken();

    // create a urlId
    const urlId = new UrlId(token);

    // store both
    await this.secretRepository.storeUrlIdAndSecret(urlId, secret);

    // return urlId only
    return urlId;
  }
}
