import { expect, describe, it } from 'vitest';
import { UrlIdValidationError } from './UrlIdValidationError';

describe('UrlIdValidationError Tests', () => {
  it('should create a UrlIdValidationError error', () => {
    const error = new UrlIdValidationError('UrlIDが短すぎます');
    expect(error).toBeInstanceOf(UrlIdValidationError);
    expect(error.name).toBe('UrlIdValidationError');
    expect(error.message).toBe('UrlIDが短すぎます');
  });
});
