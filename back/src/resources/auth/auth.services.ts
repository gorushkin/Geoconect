import { Response, NextFunction } from 'express';
import User from '../users/users.model';
import jwt from 'jsonwebtoken';
import { CONFIG } from '../../helpers/config';
import { CustomError } from '../../helpers/errorHanlder';
import { getUsers, RequestWithUser } from '../users/users.services';
import cookie from 'cookie';

export const createToken = (user: User, password: string) => {
  const compareResults = user.verifyPassword(password);
  if (!compareResults) throw new CustomError('Password is not correct', 401);
  const token = jwt.sign({ name: user.name, id: user.id }, CONFIG.SECRET);
  return token;
};

// TODO: передавать в next() объект с текстом и статусом

export const authMiddleware = async (req: RequestWithUser, _res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  const cookies = cookie.parse(req.headers.cookie || '');
  const token = authorization || cookies['token'];
  const error = new CustomError('UNAUTHORIZED', 401);
  if (!token) {
    return next(error);
  }
  const data = jwt.verify(token, CONFIG.SECRET);
  if (typeof data !== 'string') {
    const { id } = data;
    const user = await User.query().findOne({ id });
    if (!user) return next(error);
    req.user = user;
  }
  next();
};

export const forAdminOnly = async (req: RequestWithUser, _res: Response, next: NextFunction) => {
  const users = await getUsers();
  const isThereAnyAdmin = users.length !== 0;
  if (isThereAnyAdmin && !req.user?.isAdmin()) return next('You can not do this action');
  return next();
};
