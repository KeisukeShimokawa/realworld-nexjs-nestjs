import { describe, expect, it } from 'vitest';
import { SecretNotFoundError } from '../domain/errors/SecretNotFoundError';
import { UrlId } from '../domain/models/UrlId';
import { OneTimeSecretRetriever } from './OneTImeSecretRetriever';

describe('OneTimeSecretRetriver Tests', () => {
  it('should throw an error if the Secret was not found', () => {
    const oneTimeSecretRetriever = new OneTimeSecretRetriever();

    const urlId = new UrlId('ajhfdjkfhasdf');
    expect(oneTimeSecretRetriever.retrieveSecretById(urlId)).rejects.toThrow(
      SecretNotFoundError
    );
  });
});
