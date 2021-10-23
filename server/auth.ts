import express, { Request, Response } from 'express';
import { RequestOptions } from 'http';

const router = express.Router();
export const user = { name: 'admin', password: '12345' };

export const checkUserCredentials = (_name: string, password: string) => {
  const token = '1234567890';
  return password === user.password ? token : null;
};

const login = async (req: Request, res: Response) => {
  const { name, password } = req.body;
  const token = checkUserCredentials(name, password);
  if (token) {
    res.cookie('token', token);
    res.status(200).json({ token });
  } else {
    res.status(403).json({ message: 'Password is wrong!!!' });
  }
};

router.post('/', login);

export { router };
