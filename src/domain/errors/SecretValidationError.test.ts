import { expect, describe, it } from 'vitest';
import { SecretValidationError } from './SecretValidationError';

describe('SecretValidationError Tests', () => {
  it('should create a SecretValidationError error', () => {
    const error = new SecretValidationError('Secretが短すぎます');
    expect(error).toBeInstanceOf(SecretValidationError);
    expect(error.name).toBe('SecretValidationError');
    expect(error.message).toBe('Secretが短すぎます');
  });
});
