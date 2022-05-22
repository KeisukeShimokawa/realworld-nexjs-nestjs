import { describe, expect, it, vi } from 'vitest';
import { SecretNotFoundError } from '../errors/SecretNotFoundError';
import { Secret } from '../models/Secret';
import { UrlId } from '../models/UrlId';
import { OneTimeSecretRetriever } from './OneTImeSecretRetriever';
import { SecretRepository } from '../../infra/repositories/SecretRepository';

describe('OneTimeSecretRetriver Tests', () => {
  it('should throw an error if the Secret was not found', () => {
    const secretRepository: SecretRepository = {
      getSecretByUrlId: vi.fn().mockResolvedValueOnce(null),
      removeSecretByUrlId: vi.fn(),
      storeUrlIdAndSecret: vi.fn(),
    };
    const oneTimeSecretRetriever = new OneTimeSecretRetriever(secretRepository);

    const urlId = new UrlId('ajhfdjkfhasdf');
    expect(oneTimeSecretRetriever.retrieveSecretById(urlId)).rejects.toThrow(
      SecretNotFoundError
    );
    expect(secretRepository.getSecretByUrlId).toBeCalledTimes(1);
    expect(secretRepository.getSecretByUrlId).toBeCalledWith(
      new UrlId('ajhfdjkfhasdf')
    );
    expect(secretRepository.removeSecretByUrlId).toBeCalledTimes(0);
  });

  it('should return the secret when it is found', async () => {
    const secretRepository: SecretRepository = {
      getSecretByUrlId: vi.fn().mockResolvedValueOnce(new Secret('sadhfasjf')),
      removeSecretByUrlId: vi.fn(),
      storeUrlIdAndSecret: vi.fn(),
    };
    const oneTimeSecretRetriever = new OneTimeSecretRetriever(secretRepository);

    const urlId = new UrlId('ajhfdjkfhasdf');
    const secret = await oneTimeSecretRetriever.retrieveSecretById(urlId);

    expect(secret).toEqual(new Secret('sadhfasjf'));
    expect(secretRepository.getSecretByUrlId).toBeCalledTimes(1);
    expect(secretRepository.getSecretByUrlId).toBeCalledWith(
      new UrlId('ajhfdjkfhasdf')
    );
    expect(secretRepository.removeSecretByUrlId).toBeCalledTimes(1);
    expect(secretRepository.removeSecretByUrlId).toBeCalledWith(
      new UrlId('ajhfdjkfhasdf')
    );
  });
});
