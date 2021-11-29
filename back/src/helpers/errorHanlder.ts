import { Request, Response, ErrorRequestHandler, NextFunction } from 'express';

export class CustomError extends Error {
  status: string;

  constructor(error: string, status: string) {
    super(error);
    this.status = status;
  }
}

export const ErrorHandler: ErrorRequestHandler = (error, _req, res, next) => {
  const message = error instanceof Error ? error.message : error;
  console.log('ErrorHandler: ', message);
  res.status(500).send(message);
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
