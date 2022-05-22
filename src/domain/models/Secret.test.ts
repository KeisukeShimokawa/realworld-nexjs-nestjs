import { describe, expect, it } from 'vitest';
import { Secret } from './Secret';
import { SecretValidationError } from '../errors/SecretValidationError';

describe('Secret Tests', () => {
  it('should create an instance of Secret', () => {
    expect(new Secret('mySecret')).toBeInstanceOf(Secret);
  });

  it('should throw an error when secret is too short', () => {
    expect(() => new Secret('w')).toThrow(
      new SecretValidationError('Secretが短すぎます')
    );
  });

  it('should send a secret representation as string', () => {
    expect(new Secret('myValidSecret').toString()).toBe('myValidSecret');
  });
});
