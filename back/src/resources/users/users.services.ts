import Users from './users.model';
import { Request } from 'express';
import { CustomError } from '../../helpers/errorHanlder';

export const getUsers = async () => await Users.query();

export const checkEmail = async (email: string) => {
  const isEmailUsed = await Users.query().findOne({ email });
  if (isEmailUsed) throw new CustomError('This email is used!', 409);
};

export const createUser = (
  name: string,
  email: string,
  password: string,
  passwordConfirm: string,
  role?: string
) => Users.fromJson({ name, email, password, passwordConfirm, role });

export const addUser = async (
  name: string,
  email: string,
  password: string,
  passwordConfirm: string,
  role?: string
  ) => {
  await User.checkEmail(email);
  const users = await getUsers();
  const user = User.createUser(name, email, password, passwordConfirm, role  || !users.length ? 'admin' : 'user');
  return await Users.query().insert(user);
};

export const User = { getUsers, checkEmail, createUser, addUser };

export interface RequestWithUser extends Request {
  user?: Users;
}
