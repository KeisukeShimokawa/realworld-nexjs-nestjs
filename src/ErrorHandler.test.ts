import { describe, expect, it } from 'vitest';
import { errorHandler } from './ErrorHandler';

describe('ErrorHandler Tests', () => {
  it('should generate an Error response for a UrlIdValidationError', () => {
    errorHandler(error, req, res, next);

    expect(next).toBeCalledTimes(0);
    expect(res.status).toBeCalledTimes(1);
    expect(res.status).toBeCalledWith(400);
    expect(res.json).toBeCalledTimes(1);
    expect(res.json).toBeCalledWith({
      name: 'UrlIdValidationError',
      message: 'UrlIDが短すぎます',
    });
  });
});
