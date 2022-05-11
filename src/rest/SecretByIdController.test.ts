import { request, Request, response, Response } from 'express';
import { describe, expect, it, vi } from 'vitest';
import { SecretByIdController } from './SecretByIdController';
import { UrlIdValidationError } from '../UrlIdValidationError';

describe('SecretByIdController Tests', () => {
  it('should throw an error if the urlId is too short', () => {
    const req: Request = request;
    req.params = { urlId: 'test' };
    const res: Response = response;
    const next = vi.fn();

    const secretByIdController = new SecretByIdController();
    secretByIdController.retrieveSecretById(req, res, next);

    expect(next).toBeCalledTimes(1);
    expect(next).toBeCalledWith(new UrlIdValidationError('UrlIDが短すぎます'));
  });

  it('should throw an error if the secret was not found', async () => {
    const req: Request = request;
    req.params = { urlId: '924675235762345' };
    const res: Response = response;
    const next = vi.fn();

    const secretByIdController = new SecretByIdController();
    await secretByIdController.retrieveSecretById(req, res, next);

    expect(next).toBeCalledTimes(1);
    expect(next).toBeCalledWith(new SecretNotFoundError());
  });
});
