import { describe, expect, it, vi } from 'vitest';
import { SecretByIdController } from './SecretByIdController';
import { UrlIdValidationError } from './UrlIdValidationError';

describe('SecretByIdController Tests', () => {
  it('should throw an error if the urlId is too short', () => {
    const secretByIdController = new SecretByIdController();
    secretByIdController.retrieveSecretById(req, res, next);

    expect(next).toBeCalledTimes(1);
    expect(next).toBeCalledWith(new UrlIdValidationError('UrlIDが短すぎます'));
  });
});
