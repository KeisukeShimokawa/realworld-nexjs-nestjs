import { UrlId } from '../domain/UrlId';
import { Secret } from '../domain/Secret';

export interface SecretRetriver {
  retrieveSecretById(urlId: UrlId): Promise<Secret>;
}
