import express, { Request, Response } from 'express';
import { router as news } from './resources/news/news.router';
import { router as users } from './resources/users/users.router';
import { router as auth } from './resources/auth/auth.router';
import cors from 'cors';
import fileUpload from 'express-fileupload';

import path from 'path';
import { ErrorHandler } from './helpers/errorHanlder';
import { authMiddleware } from './resources/auth/auth.services';
const dirname = path.join(path.resolve());

const app = express();
app.use(fileUpload());
app.use(cors());
app.use(express.json());
app.use('/images', express.static(path.join(dirname, 'images')));
app.use(express.urlencoded());

app.use((req, _res, next) => {
  console.log(req.originalUrl);
  console.log(req.body);
  console.log('-----------------');
  next();
});

app.use('/api/auth', auth);
app.use('/api/news', news);
app.use('/api/users', users);

app.use('/api/test', (_req: Request, res: Response) =>
  res.status(200).json({ message: 'Server is running!!!' })
);

app.use('/api/authtest', authMiddleware, (_req: Request, res: Response) =>
  res.status(200).send({ message: 'Server is running!!!' })
);

app.use(ErrorHandler);

export default app;
