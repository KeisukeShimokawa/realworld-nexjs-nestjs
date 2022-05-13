import { Request, request, Response, response } from 'express';
import { describe, expect, it, vi } from 'vitest';
import { SecretNotFoundError } from '../../errors/SecretNotFoundError';
import { UrlIdValidationError } from '../../errors/UrlIdValidationError';
import { errorHandler } from './ErrorHandler';

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

  it('should generate an Error response for a SecretNotFoundError', () => {
    const error = new SecretNotFoundError();
    const req: Request = request;
    req.params = { urlId: 'test' };
    const res: Response = response;
    res.status = vi.fn().mockReturnThis();
    res.json = vi.fn().mockReturnThis();
    const next = vi.fn();

    errorHandler(error, req, res, next);

    console.log(res);
    expect(next).toBeCalledTimes(0);
    expect(res.status).toBeCalledTimes(1);
    expect(res.status).toBeCalledWith(404);
    expect(res.json).toBeCalledTimes(1);
    expect(res.json).toBeCalledWith({
      name: 'SecretNotFoundError',
      message: 'Secret was not found in the system',
    });
  });
});
