import express, { Request, Response } from 'express';
import { router as news } from './resources/news/news.router';
import { router as users } from './resources/users/users.router';
import { router as auth } from './resources/auth/auth.router';
import { router as applications } from './resources/applications/applications.router';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import { sendMail, startSMTP } from './helpers/emailSender';

import path from 'path';
import { ErrorHandler, errorWrapper } from './helpers/errorHanlder';
import { authMiddleware } from './resources/auth/auth.services';
import { RequestWithUser } from './resources/users/users.services';
const dirname = path.join(path.resolve());

const app = express();
startSMTP();
app.use(fileUpload());
app.use(cors());
app.use(express.json());
app.use('/images', express.static(path.join(dirname, 'images')));
app.use(express.urlencoded());

app.use((req, _res, next) => {
  console.log(req.originalUrl);
  console.log(JSON.stringify(req.body, null, 2));
  console.log('-----------------');
  next();
});

app.use('/api/auth', auth);
app.use('/api/news', news);
app.use('/api/users', authMiddleware, users);
app.use('/api/applications', applications);

app.use('/api/request', (req: Request, res: Response) => {
  console.log(req.body);
  res.status(200).json({ message: 'Server is running!!!' });
});

app.use('/api/test', (_req: Request, res: Response) =>
  res.status(200).json({ message: 'Server is running!!!' })
);

app.use('/api/authtest', authMiddleware, (_req: RequestWithUser, res: Response) =>
  res.status(200).send({ message: 'Server is running!!!' })
);

app.use(
  '/api/emailTest',
  errorWrapper(async (_req: RequestWithUser, res: Response) => {
    const result = await sendMail();
    console.log('result: ', result);
    res.status(200).send({ message: 'No message' });
  })
);

app.use('*', (_req: Request, res: Response) => res.status(418).json({ message: "I'm a teapot" }));

app.use(ErrorHandler);

export default app;
