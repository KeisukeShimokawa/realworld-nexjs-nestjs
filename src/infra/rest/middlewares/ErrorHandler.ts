import { NextFunction, Request, Response } from 'express';
import { SecretNotFoundError } from '../../../domain/errors/SecretNotFoundError';
import { SecretValidationError } from '../../../domain/errors/SecretValidationError';
import { UrlIdValidationError } from '../../../domain/errors/UrlIdValidationError';
import { RequestValidationError } from '../Secret/RequestValidationError';

export function errorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (error instanceof SecretNotFoundError) {
    res.status(404).json({
      name: error.name,
      message: error.message,
    });
  } else if (
    error instanceof UrlIdValidationError ||
    error instanceof RequestValidationError ||
    error instanceof SecretValidationError
  ) {
    res.status(400).json({
      name: error.name,
      message: error.message,
    });
  } else {
    res.status(500).json({
      name: 'InternalServerError',
      message: 'Something went wrong',
    });
  }
}
