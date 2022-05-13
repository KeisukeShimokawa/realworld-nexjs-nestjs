import { describe, expect, it } from 'vitest';
import { Secret } from './Secret';

describe('Secret Tests', () => {
  it('should create an instance of Secret', () => {
    expect(new Secret('mySecret')).toBeInstanceOf(Secret);
  });
});
