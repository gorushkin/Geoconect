import express, { Request, Response } from 'express';
import { router as news } from './news/news.router';
import { router as auth } from './auth';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import path from 'path';
const dirname = path.join(path.resolve());

const app = express();
app.use(fileUpload());
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(dirname, 'images')));
app.use(express.urlencoded());

app.use('/api/auth', auth);
app.use('/api/news', news);
app.use('/api/test', (_req: Request, res: Response) =>
  res.status(200).json({ message: 'Server is running!!!' })
);

export default app;
