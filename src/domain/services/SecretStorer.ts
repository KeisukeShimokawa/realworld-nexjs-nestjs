import { Secret } from '../models/Secret';
import { UrlId } from '../models/UrlId';

export interface SecretStorer {
  storeSecretAndUrlId(secret: Secret): Promise<UrlId>;
}
