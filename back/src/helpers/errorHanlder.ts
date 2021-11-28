import { Request, Response, ErrorRequestHandler, NextFunction } from 'express';

export const ErrorHandler: ErrorRequestHandler = (error, _req, res, next) => {
  const message = error instanceof Error ? error.message : error;
  console.log('message: ', message);
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
