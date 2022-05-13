import { UrlId } from './UrlId';
import { Secret } from './Secret';

export interface SecretRetriver {
  retrieveSecretById(urlId: UrlId): Promise<Secret>;
}
