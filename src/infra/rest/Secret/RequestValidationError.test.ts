import { expect, describe, it } from 'vitest';
import { RequestValidationError } from './RequestValidationError';

describe('RequestValidationError Tests', () => {
  it('should create a RequestValidationError error', () => {
    const error = new RequestValidationError('Request body is not valid');
    expect(error).toBeInstanceOf(RequestValidationError);
    expect(error.name).toBe('RequestValidationError');
    expect(error.message).toBe('Request body is not valid');
  });
});
