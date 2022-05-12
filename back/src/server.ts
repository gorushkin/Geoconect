import express, { Request, Response } from 'express';
import { router as news } from './resources/news/news.router';
import { router as users } from './resources/users/users.router';
import { router as auth } from './resources/auth/auth.router';
import { router as tools } from './resources/tools/tools.router';
import { router as proposals } from './resources/proposals/proposals.router';
import { router as files } from './resources/files/files.router';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import { sendMail, startSMTP } from './helpers/emailSender';
import { User } from './resources/users/users.services';
import path from 'path';
import { ErrorHandler, errorWrapper } from './helpers/errorHanlder';
import { authMiddleware } from './resources/auth/auth.services';
import { getUsers, RequestWithUser } from './resources/users/users.services';
import * as Sentry from '@sentry/node';
const dirname = path.join(path.resolve());
import { CONFIG } from './helpers/config';
import { RewriteFrames } from '@sentry/integrations';
import { CustomError } from './helpers/errorHanlder';

if (CONFIG.NODE_ENV === 'production') {
  Sentry.init({
    dsn: CONFIG.SENTRY_DSN,
    integrations: [
      new RewriteFrames({
        root: global.__dirname,
      }),
    ],
  });
}

const app = express();

app.use(Sentry.Handlers.requestHandler());

startSMTP();
app.use(fileUpload());
app.use(cors());
app.use(express.json());
app.use('/images', express.static(path.join(dirname, CONFIG.IMAGES_FOLDER_PATH)));
app.use(express.urlencoded());

app.use((req, _res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  console.log(JSON.stringify(req.body, null, 2));
  console.log('-----------------');
  next();
});

app.use('/api/auth', auth);
app.use('/api/news', news);
app.use('/api/users', users);
app.use('/api/applications', proposals);
app.use('/api/tools', tools);
app.use('/files/', authMiddleware, files);

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

// TODO: переделать проверку на наличие админа

const getServerInfo = async (_req: RequestWithUser, res: Response) => {
  const users = await User.getUsers();
  const isAdmin = !!users.length;
  res.status(200).send({ isAdmin });
};

app.use('/api/info', errorWrapper(getServerInfo));

app.use(
  '/api/emailTest',
  errorWrapper(async (_req: RequestWithUser, res: Response) => {
    const result = await sendMail();
    res.status(200).send({ message: 'No message' });
  })
);

app.use('*', (_req: Request, res: Response) => res.status(418).json({ message: "I'm a teapot" }));

app.use(Sentry.Handlers.errorHandler());

app.use(ErrorHandler);

export default app;
