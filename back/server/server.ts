import express, { Request, Response } from 'express';
import { router as news } from './news/news.router';
import { router as auth } from './auth';
import cors from 'cors';
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', auth);
app.use('/api/news', news);
app.use('/api/test', (req: Request, res: Response) =>
  res.status(200).json({ message: 'Server is running!!!' })
);

export default app;
