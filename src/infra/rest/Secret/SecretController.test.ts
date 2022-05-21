import { request, Request, response, Response } from 'express';
import { describe, expect, it, vi } from 'vitest';
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

    const secretByIdController = new SecretController();
    await secretByIdController.storeSecret(req, res, next);

    expect(next).toBeCalledTimes(1);
    expect(next).toBeCalledWith(
      new RequestValidationError('Request body format is not valid')
    );
  });
});
