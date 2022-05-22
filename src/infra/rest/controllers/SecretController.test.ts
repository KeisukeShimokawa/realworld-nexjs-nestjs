import { request, Request, response, Response } from 'express';
import { describe, expect, it, vi } from 'vitest';
import { SecretValidationError } from '../../../domain/errors/SecretValidationError';
import { Secret } from '../../../domain/models/Secret';
import { UrlId } from '../../../domain/models/UrlId';
import { SecretStorer } from '../../../domain/services/SecretStorer';
import { RequestValidationError } from './RequestValidationError';
import { SecretController } from './SecretController';

describe('SecretController Tests', () => {
  it('should throw an error if the secret is not presend in the body', async () => {
    const req: Request = request;
    req.body = {
      asb: 'ajsdhfa',
    };
    const res: Response = response;
    const next = vi.fn();

    const secretStorer: SecretStorer = {
      storeSecretAndUrlId: vi.fn(),
    };
    const secretByIdController = new SecretController(secretStorer);
    await secretByIdController.storeSecret(req, res, next);

    expect(next).toBeCalledTimes(1);
    expect(next).toBeCalledWith(
      new RequestValidationError('Request body format is not valid')
    );
  });

  it('should throw an error if the secret is not a string', async () => {
    const req: Request = request;
    req.body = {
      secret: 3641234132,
    };
    const res: Response = response;
    const next = vi.fn();

    const secretStorer: SecretStorer = {
      storeSecretAndUrlId: vi.fn(),
    };
    const secretByIdController = new SecretController(secretStorer);
    await secretByIdController.storeSecret(req, res, next);

    expect(next).toBeCalledTimes(1);
    expect(next).toBeCalledWith(
      new RequestValidationError('Secret is not a string')
    );
  });

  it('should throw an error if the secret is too short', async () => {
    const req: Request = request;
    req.body = {
      secret: '22',
    };
    const res: Response = response;
    const next = vi.fn();

    const secretStorer: SecretStorer = {
      storeSecretAndUrlId: vi.fn(),
    };
    const secretByIdController = new SecretController(secretStorer);
    await secretByIdController.storeSecret(req, res, next);

    expect(next).toBeCalledTimes(1);
    expect(next).toBeCalledWith(
      new SecretValidationError('Secretが短すぎます')
    );
  });

  it('should store the secret and return the urlId', async () => {
    const req: Request = request;
    req.body = {
      secret: 'myValidSecret22',
    };
    const res: Response = response;
    res.status = vi.fn().mockReturnThis();
    res.json = vi.fn().mockReturnThis();
    const next = vi.fn();

    const secretStorer: SecretStorer = {
      storeSecretAndUrlId: vi
        .fn()
        .mockResolvedValueOnce(new UrlId('jhsdgfksdjhfas')),
    };
    const secretByIdController = new SecretController(secretStorer);
    await secretByIdController.storeSecret(req, res, next);

    expect(next).toBeCalledTimes(0);
    expect(secretStorer.storeSecretAndUrlId).toBeCalledTimes(1);
    expect(secretStorer.storeSecretAndUrlId).toBeCalledWith(
      new Secret('myValidSecret22')
    );
    expect(res.status).toBeCalledTimes(1);
    expect(res.json).toBeCalledTimes(1);
    expect(res.json).toBeCalledWith(new UrlId('jhsdgfksdjhfas'));
  });
});
