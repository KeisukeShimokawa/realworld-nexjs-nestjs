import { describe, expect, it, vi } from 'vitest';
import { once } from '.';

describe('vitest examples', () => {
  describe('once', () => {
    it('関数をただ一度のみ実行できる', () => {
      const originalFn = vi.fn();
      const onceFn = once(originalFn);

      onceFn();
      onceFn();
      expect(originalFn).toBeCalledTimes(1);
    });
  });
});
