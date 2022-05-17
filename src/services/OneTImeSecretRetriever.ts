import { Secret } from '../domain/models/Secret';
import { UrlId } from '../domain/models/UrlId';
import { SecretNotFoundError } from '../domain/errors/SecretNotFoundError';
import { SecretRepository } from './SecretRepository';
import { SecretRetriver } from './SecretRetriver';

export class OneTimeSecretRetriever implements SecretRetriver {
  constructor(private secretRepository: SecretRepository) {}

  async retrieveSecretById(urlId: UrlId): Promise<Secret> {
    const secret = await this.secretRepository.getSecretByUrlId(urlId);
    if (secret === null) throw new SecretNotFoundError();

    return secret;
  }
}
