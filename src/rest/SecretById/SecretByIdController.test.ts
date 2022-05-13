import { request, Request, response, Response } from 'express';
import { describe, expect, it, vi } from 'vitest';
import { SecretByIdController } from './SecretByIdController';
import { UrlIdValidationError } from '../../errors/UrlIdValidationError';
import { SecretRetriver } from '../../services/SecretRetriver';
import { SecretNotFoundError } from '../../errors/SecretNotFoundError';
import { UrlId } from '../../domain/UrlId';

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
});
