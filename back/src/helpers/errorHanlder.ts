import { Request, Response, ErrorRequestHandler, NextFunction } from 'express';
import { ValidationError, DBError } from 'objection';

export class CustomError extends Error {
  status: number;

  constructor(error: string, status: number) {
    super(error);
    this.status = status;
  }
}

export const ErrorHandler: ErrorRequestHandler = (error, _req, res, next) => {
  if (error instanceof ValidationError) {
    // ValidationError
    const message = error.message.split(', ');
    res.status(400).send(message);
  } else if (error instanceof DBError) {
    // DBError
    // const message = error instanceof Error ? error.message : error;
    const status = error instanceof CustomError ? error.status : 500;
    res.status(status).send('Something went wrong');
  } else {
    const message = error instanceof Error ? error.message : error;
    const status = error instanceof CustomError ? error.status : 500;
    res.status(status).send(message);
  }
  next();
};

export const errorWrapper =
  (fn: any) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      return await fn(req, res);
    } catch (error) {
      next(error);
    }
  };
