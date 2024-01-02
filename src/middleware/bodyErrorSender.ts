import { Request, Response, NextFunction } from 'express';
import { ValidationError } from 'joi';

const validateRequest = (validator: any) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    await validator.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (err) {
    const validationError = err as ValidationError;
    const errors = (validationError.details || []).map((detail: any) => {

      const field = detail.context?.key || 'unknown';
      const message = detail.message;
      return `${field}: ${message}`;
    });
    const errorMessage = {
      success: false,
      message: 'Validation error',
      errors: errors,
    };
    res.status(422).json(errorMessage);
  }
};

export default validateRequest;
