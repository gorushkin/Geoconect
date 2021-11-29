import { Request, Response, NextFunction } from 'express';
import User from '../users/users.model';
import jwt from 'jsonwebtoken';
import { CONFIG } from '../../helpers/config';
import { CustomError } from '../../helpers/errorHanlder';

export const createToken = (user: User, password: string) => {
  const compareResults = user.verifyPassword(password);
  if (!compareResults)  throw new CustomError('Password is not correct', 401);
  const token = jwt.sign({ name: user.name }, CONFIG.SECRET);
  return token;
};

export const authMiddleware = (req: Request, _res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  if (!authorization) throw new CustomError('UNAUTHORIZED', 401);
  const data = jwt.verify(authorization, CONFIG.SECRET);
  if (typeof data !== 'string') console.log(data['name']);
  next();
};
