import { Secret } from '../models/Secret';
import { UrlId } from '../models/UrlId';
import { SecretNotFoundError } from '../errors/SecretNotFoundError';
import { SecretRepository } from '../../infra/repositories/SecretRepository';
import { SecretRetriver } from './SecretRetriver';

export class OneTimeSecretRetriever implements SecretRetriver {
  constructor(private secretRepository: SecretRepository) {}

  async retrieveSecretById(urlId: UrlId): Promise<Secret> {
    const secret = await this.secretRepository.getSecretByUrlId(urlId);
    if (secret === null) throw new SecretNotFoundError();
    await this.secretRepository.removeSecretByUrlId(urlId);
    return secret;
  }
}
