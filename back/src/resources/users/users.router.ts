import express, { Request, Response } from 'express';
import Users from './users.model';
// TODO: при редкатировании создавать копии в другой таблице для отката
import { errorWrapper } from '../../helpers/errorHanlder';

const router = express.Router();

const getUsers = async (_req: Request, res: Response) => {
  const users = await Users.query();
  res.status(200).json(users);
};

const createUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const user = Users.fromJson({ name, email, password });
  const isEmailUsed = await Users.query().findOne({ email });
  if (isEmailUsed) throw Error('This email is used!');
  await Users.query().insert(user);
  res.status(200).json('createUser');
};

const getUser = async (_req: Request, _res: Response) => {};

router.get('/', errorWrapper(getUsers));
router.post('/', errorWrapper(createUser));
router.get('/:id', errorWrapper(getUser));
// router.patch('/:id', updateNews);
// router.delete('/:id', deleteNews);

export { router };
