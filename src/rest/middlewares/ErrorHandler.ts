import { NextFunction, Request, Response } from 'express';
import { SecretNotFoundError } from '../../errors/SecretNotFoundError';

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
  } else {
    res.status(400).json({
      name: error.name,
      message: error.message,
    });
  }
}
