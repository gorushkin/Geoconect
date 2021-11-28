import express, { Request, Response } from 'express';
import User from '../users/users.model';

import { errorWrapper } from '../../helpers/errorHanlder';
import { createToken } from './auth.services';

const router = express.Router();
export const user = { name: 'admin', password: '12345' };

export const checkUserCredentials = (_name: string, password: string) => {
  const token = '1234567890';
  return password === user.password ? token : null;
};

const auth = async (req: Request, res: Response) => {
  const { name, password } = req.body;
  const user = await User.query().findOne({ name });
  if (!user) throw Error('There is no user with this username');
  const token = createToken(user, password);
  res.status(200).send({token});
};

router.post('/', errorWrapper(auth));

export { router };
