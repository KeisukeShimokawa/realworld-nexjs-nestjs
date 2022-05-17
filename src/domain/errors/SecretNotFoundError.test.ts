import { expect, describe, it } from 'vitest';
import { SecretNotFoundError } from './SecretNotFoundError';

describe('UrlIdValidationError Tests', () => {
  it('should create a UrlIdValidationError error', () => {
    const error = new SecretNotFoundError();
    expect(error).toBeInstanceOf(SecretNotFoundError);
    expect(error.name).toBe('SecretNotFoundError');
    expect(error.message).toBe('Secret was not found in the system');
  });
});
