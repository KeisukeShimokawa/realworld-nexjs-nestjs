import { UrlId } from './UrlId';

export interface SecretRetriver {
  retrieveSecretById(urlId: UrlId): Promise<Secret>;
}
