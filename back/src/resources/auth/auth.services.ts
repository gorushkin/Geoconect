import { Request, Response, NextFunction } from 'express';
import User from '../users/users.model';
import jwt from 'jsonwebtoken';
import { CONFIG } from '../../helpers/config';
import { CustomError } from '../../helpers/errorHanlder';
import { RequestWithUser } from '../users/users.services';

export const createToken = (user: User, password: string) => {
  const compareResults = user.verifyPassword(password);
  if (!compareResults) throw new CustomError('Password is not correct', 401);
  const token = jwt.sign({ name: user.name, id: user.id }, CONFIG.SECRET);
  return token;
};

export const authMiddleware = async (req: RequestWithUser, _res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  if (!authorization) throw new CustomError('UNAUTHORIZED', 401);
  const data = jwt.verify(authorization, CONFIG.SECRET);
  if (typeof data !== 'string') {
    const { id } = data;
    const user = await User.query().findOne({ id });
    req.user = user;
  }
  next();
};

export const forAdminOnly = async (req: RequestWithUser, _res: Response, next: NextFunction) => {
  if (!req.user?.isAdmin()) throw Error('You can not do this action');
  next();
};
