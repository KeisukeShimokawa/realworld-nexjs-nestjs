import { Secret } from '../domain/models/Secret';
import { UrlId } from '../domain/models/UrlId';

export interface SecretStorer {
  storeSecretAndUrlId(secret: Secret): Promise<UrlId>;
}
