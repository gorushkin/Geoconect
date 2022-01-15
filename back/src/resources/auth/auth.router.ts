import express, { Request, Response } from 'express';
import User from '../users/users.model';

import { CustomError, errorWrapper } from '../../helpers/errorHanlder';
import { createToken } from './auth.services';

const router = express.Router();

const auth = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await User.query().findOne({ email });
  if (!user) throw new CustomError('There is no user with this email', 401);
  const token = createToken(user, password);
  res.status(200).send({ token, user: user.info() });
};

router.post('/', errorWrapper(auth));

export { router };
