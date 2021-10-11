// auth
import { user } from './database';

export const checkUserCredentials = (_name, password) => {
  const token = '1234567890';
  return password === user.passwod ? token : null;
};
