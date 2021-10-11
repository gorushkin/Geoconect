import cookies from '../../utils';

import { checkUserCredentials } from '../../services';

const login = async (req, res) => {
  const { name, password } = req.body;
  const token = checkUserCredentials(name, password);
  if (token) {
    res.cookie('token', token);
    res.status(200).json({ token });
  } else {
    res.status(403).json({ message: 'Password is wrong!!!' });
  }
};

const handler = async (req, res) => {
  if (req.method === 'POST') {
    await login(req, res);
  } else {
    console.log('else');
    // Handle any other HTTP method
  }
};

export default cookies(handler);
