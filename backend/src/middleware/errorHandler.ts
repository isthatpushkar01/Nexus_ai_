import { Request, Response, NextFunction } from 'express';
import { AppError, InternalServerError } from '../utils/errors.js';
import { logger } from '../config/logger.js';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error('Error:', err);

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      error: {
        code: err.code,
        message: err.message,
      },
    });
  }

  const internalError = new InternalServerError('An unexpected error occurred');
  return res.status(internalError.statusCode).json({
    success: false,
    error: {
      code: internalError.code,
      message: internalError.message,
    },
  });
};
