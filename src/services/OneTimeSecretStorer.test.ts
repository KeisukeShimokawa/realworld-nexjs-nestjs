import { describe, expect, it, vi } from 'vitest';
import { Secret } from '../domain/models/Secret';
import { UrlId } from '../domain/models/UrlId';
import { OneTimeSecretStorer } from './OneTimeSecretStorer';
import { SecretRepository } from './SecretRepository';
import { TokenGenerator } from './TokenGenerator';

describe('OneTimeSecretStorer Tests', () => {
  it('should store a secret in the repository and return a UrlId', async () => {
    const secretRepository: SecretRepository = {
      getSecretByUrlId: vi.fn(),
      removeSecretByUrlId: vi.fn(),
      storeUrlIdAndSecret: vi.fn(),
    };
    const tokenGenerator: TokenGenerator = {
      generateToken: vi.fn().mockReturnValueOnce('fgashfgkafas'),
    };

    const oneTimeSecretStorer = new OneTimeSecretStorer(
      secretRepository,
      tokenGenerator
    );
    const secret = new Secret('myValidSecret22');
    const result = await oneTimeSecretStorer.storeSecretAndUrlId(secret);

    const urlId = new UrlId('fgashfgkafas');
    expect(result).toEqual(urlId);
    expect(secretRepository.storeUrlIdAndSecret).toBeCalledTimes(1);
    expect(secretRepository.storeUrlIdAndSecret).toBeCalledWith(urlId, secret);
  });
});
