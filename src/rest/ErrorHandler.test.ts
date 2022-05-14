import { Request, request, Response, response } from 'express';
import { describe, expect, it, vi } from 'vitest';
import { errorHandler } from './ErrorHandler';
import { UrlIdValidationError } from '../UrlIdValidationError';

describe('ErrorHandler Tests', () => {
  it('should generate an Error response for a UrlIdValidationError', () => {
    const error = new UrlIdValidationError('UrlIDが短すぎます');
    const req: Request = request;
    req.params = { urlId: 'test' };
    const res: Response = response;
    res.status = vi.fn().mockReturnThis();
    res.json = vi.fn().mockReturnThis();
    const next = vi.fn();

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
