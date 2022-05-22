import { request, Request, response, Response } from 'express';
import { describe, expect, it, vi } from 'vitest';
import { SecretByIdController } from './SecretByIdController';
import { UrlIdValidationError } from '../../../domain/errors/UrlIdValidationError';
import { SecretNotFoundError } from '../../../domain/errors/SecretNotFoundError';
import { UrlId } from '../../../domain/models/UrlId';
import { Secret } from '../../../domain/models/Secret';
import { SecretRetriver } from '../../../domain/services/SecretRetriver';

describe('SecretByIdController Tests', () => {
  it('should throw an error if the urlId is too short', async () => {
    const req: Request = request;
    req.params = { urlId: 'test' };
    const res: Response = response;
    const next = vi.fn();

    const secretRetriever: SecretRetriver = {
      retrieveSecretById: vi.fn(),
    };
    const secretByIdController = new SecretByIdController(secretRetriever);
    await secretByIdController.retrieveSecretById(req, res, next);

    expect(next).toBeCalledTimes(1);
    expect(next).toBeCalledWith(new UrlIdValidationError('UrlIDが短すぎます'));
    expect(secretRetriever.retrieveSecretById).toBeCalledTimes(0);
  });

  it('should throw an error if the secret was not found', async () => {
    const req: Request = request;
    req.params = { urlId: '924675235762345' };
    const res: Response = response;
    const next = vi.fn();

    const secretRetriever: SecretRetriver = {
      retrieveSecretById: vi.fn().mockImplementationOnce(async () => {
        throw new SecretNotFoundError();
      }),
    };
    const secretByIdController = new SecretByIdController(secretRetriever);
    await secretByIdController.retrieveSecretById(req, res, next);

    expect(next).toBeCalledTimes(1);
    expect(next).toBeCalledWith(new SecretNotFoundError());
    expect(secretRetriever.retrieveSecretById).toBeCalledTimes(1);
    expect(secretRetriever.retrieveSecretById).toBeCalledWith(
      new UrlId('924675235762345')
    );
  });

  it('should respond with a secret when it is found', async () => {
    const req: Request = request;
    req.params = { urlId: '924675235762345' };
    const res: Response = response;
    res.status = vi.fn().mockReturnThis();
    res.json = vi.fn().mockReturnThis();
    const next = vi.fn();

    const secretRetriever: SecretRetriver = {
      retrieveSecretById: vi
        .fn()
        .mockResolvedValueOnce(new Secret('hsdfgaskf')),
    };
    const secretByIdController = new SecretByIdController(secretRetriever);
    await secretByIdController.retrieveSecretById(req, res, next);

    expect(next).toBeCalledTimes(0);
    expect(secretRetriever.retrieveSecretById).toBeCalledTimes(1);
    expect(secretRetriever.retrieveSecretById).toBeCalledWith(
      new UrlId('924675235762345')
    );
    expect(res.status).toBeCalledTimes(1);
    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledTimes(1);
    expect(res.json).toBeCalledWith({ secret: 'hsdfgaskf' });
  });
});
