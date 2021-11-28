import { Request, Response, NextFunction } from 'express';
import User from '../users/users.model';
import jwt from 'jsonwebtoken';
import { CONFIG } from '../../helpers/config';

export const createToken = (user: User, password: string) => {
  const compareResults = user.verifyPassword(password);
  if (!compareResults) throw Error('Paswword is not corrent');
  const token = jwt.sign({ name: user.name }, CONFIG.SECRET, {
    expiresIn: '4h',
  });

  return token;
};

export const authMiddleware = (req: Request, _res: Response, next: NextFunction) => {
  const {authorization} = req.headers;
  if (authorization) {
    console.log(authorization);
  }
  next();
};
