import { describe, expect, it } from 'vitest';
import { Secret } from '../domain/models/Secret';
import { UrlId } from '../domain/models/UrlId';
import { OneTimeSecretStorer } from './OneTimeSecretStorer';

describe('OneTimeSecretStorer Tests', () => {
  it('should store a secret in the repository and return a UrlId', async () => {
    const oneTimeSecretStorer = new OneTimeSecretStorer();
    const secret = new Secret('myValidSecret22');
    const result = await oneTimeSecretStorer.storeSecretAndUrlId(secret);

    const urlId = new UrlId('fgashfgkafas');
    expect(result).toEqual(urlId);
    expect(secretRepository.storeUrlIdAndSecret).toBeCalledTimes(1);
    expect(secretRepository.storeUrlIdAndSecret).toBeCalledWith(urlId, secret);
  });
});
