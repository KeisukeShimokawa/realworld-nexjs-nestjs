import { describe, expect, it } from 'vitest';
import { UrlId } from './UrlId';
import { UrlIdValidationError } from './UrlIdValidationError';

describe('UrlId Tests', () => {
  it('should create a instance of UrlId', () => {
    expect(new UrlId('123jjshdfajslhfd')).toBeInstanceOf(UrlId);
  });

  it('should throw an error when attemping to create a UrlId that is too short', () => {
    expect(() => new UrlId('test')).toThrow(
      new UrlIdValidationError('UrlIDが短すぎます')
    );
  });
});
