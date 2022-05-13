import { Secret } from '../domain/models/Secret';
import { UrlId } from '../domain/models/UrlId';
import { SecretRetriver } from './SecretRetriver';

export class OneTimeSecretRetriever implements SecretRetriver {
  retrieveSecretById(urlId: UrlId): Promise<Secret> {
    throw new Error('Method not implemented.');
  }
}
