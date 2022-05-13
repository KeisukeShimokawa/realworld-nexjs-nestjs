import { describe, expect, it } from 'vitest';
import { SecretNotFoundError } from '../domain/errors/SecretNotFoundError';
import { UrlId } from '../domain/models/UrlId';

describe('OneTimeSecretRetriver Tests', () => {
  it('should throw an error if the Secret was not found', () => {
    const oneTimeSecretRetriver = new OneTimeSecretRetriver();

    const urlId = new UrlId('ajhfdjkfhasdf');
    expect(oneTimeSecretRetriver.retrieveSecretByUrlId(urlId)).rejects.toThrow(
      SecretNotFoundError
    );
  });
});
