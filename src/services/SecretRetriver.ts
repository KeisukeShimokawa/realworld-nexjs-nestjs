import { UrlId } from '../domain/models/UrlId';
import { Secret } from '../domain/models/Secret';

export interface SecretRetriver {
  retrieveSecretById(urlId: UrlId): Promise<Secret>;
}
