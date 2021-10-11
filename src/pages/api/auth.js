const user = { name: 'admin', passwod: '12345' };

const checkUserCredentials = (_name, password) => {
  const token = '1234567890';
  return password === user.passwod ? token : null;
};

const login = async (req, res) => {
  console.log('req: ', req.headers.authorization);
  const { name, password } = req.body;
  const token = checkUserCredentials(name, password);
  if (token) {
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

export default handler;
