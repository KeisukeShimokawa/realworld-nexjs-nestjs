import { describe, expect, it, vi } from 'vitest';
import { UniqidTokenGenerator } from './UniqidTokenGenerator';

import uniqid from 'uniqid';
vi.mock('uniqid');

describe('UniqidTokenGenerator Tests', () => {
  it('should generate a token', () => {
    vi.mocked(uniqid).mockReturnValueOnce('hsjkadgfkhjsagf');
    const uniqidTokenGenerator = new UniqidTokenGenerator();

    expect(uniqidTokenGenerator.generateToken()).toBe('hsjkadgfkhjsagf');
  });
});
