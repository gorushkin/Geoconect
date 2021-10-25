import express, { Request, Response } from 'express';
import { router as news } from './news/news.router';
import { router as auth } from './auth';
const app = express();

app.use(express.json());

app.use('/auth', auth);
app.use('/news', news);
app.use('/test', (req: Request, res: Response) =>
  res.status(200).json({ message: 'Server is running!!!' })
);

export default app;
