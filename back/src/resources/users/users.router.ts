import express, { Response } from 'express';
// TODO: при редкатировании создавать копии в другой таблице для отката
import { errorWrapper } from '../../helpers/errorHanlder';
import { forAdminOnly } from '../auth/auth.services';

import { RequestWithUser, User } from './users.services';

const router = express.Router();

const getUsers = async (_req: RequestWithUser, res: Response) => {
  const users = await User.getUsers();
  res.status(200).json(users);
};

const createUser = async (req: RequestWithUser, res: Response) => {
  const { name, email, password } = req.body;
  const user = await User.addUser(name, email, password);
  // TODO: добавить возврат юзера
  res.status(200).json('createUser');
};

const getUser = async (_req: RequestWithUser, _res: Response) => {};

router.get('/', errorWrapper(getUsers));
router.post('/', forAdminOnly, errorWrapper(createUser));
router.get('/:id', errorWrapper(getUser));

export { router };
