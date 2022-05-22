import { describe, expect, it } from 'vitest';

describe('UniqidTokenGenerator Tests', () => {
  it('should generate a token', () => {
    const uniqidTokenGenerator = new UniqidTokenGenerator();

    expect(uniqidTokenGenerator.generateToken()).toBe('hsjkadgfkhjsagf');
  });
});
