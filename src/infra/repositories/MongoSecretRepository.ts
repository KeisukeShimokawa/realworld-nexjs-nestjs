import { Secret } from '../../domain/models/Secret';
import { UrlId } from '../../domain/models/UrlId';
import { SecretRepository } from '../../services/SecretRepository';

export class MongoSecretRepository implements SecretRepository {
  constructor() {}

  async getSecretByUrlId(urlId: UrlId): Promise<Secret> {
    throw new Error('method not implemented.');
  }
}
