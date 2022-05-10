import { describe, expect, it } from 'vitest';
import { UrlId } from './UrlId';

describe('UrlId Tests', () => {
  it('should create a instance of UrlId', () => {
    expect(new UrlId('123jjshdfajslhfd')).toBeInstanceOf(UrlId);
  });
  });
});
