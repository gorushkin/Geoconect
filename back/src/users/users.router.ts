import express, { Request, Response } from 'express';
import Users from './users.model';

// TODO: при редкатировании создавать копии в другой таблице для отката

const router = express.Router();

const getUsers = async (_req: Request, res: Response) => {
  try {
    const users = await Users.query();
    res.status(200).json(users);
  } catch (error) {
    const message = error instanceof Error ? error.message : error;
    res.status(500).json({ message });
  }
};

const createUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  try {
    const user = Users.fromJson({ name, email, password });
    console.log('user: ', user);
    res.status(200).json('createUser');
  } catch (error) {
    const message = error instanceof Error ? error.message : error;
    res.status(500).json({ message });
  }
};

router.get('/', getUsers);
router.post('/', createUser);
// router.get('/:id', getNews);
// router.patch('/:id', updateNews);
// router.delete('/:id', deleteNews);

export { router };
