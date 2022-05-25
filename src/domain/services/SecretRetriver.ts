import { UrlId } from '../models/UrlId';
import { Secret } from '../models/Secret';

export interface SecretRetriver {
  retrieveSecretById(urlId: UrlId): Promise<Secret>;
}
