import express, { Request, Response } from 'express';
import News from './news.model';

const router = express.Router();

const getAllnews = async (req: Request, res: Response) => {
  try {
    const news = await News.query();
    res.status(200).json({ news });
  } catch (error) {
    const message = error instanceof Error ? error.message : error;
    res.status(500).json({ message });
  }
};

const createNews = async (req: Request, res: Response) => {
  const body = req.body;
  try {
    const news = News.fromJson(body);
    const qwe = await News.query().insert(news);
    console.log('qwe: ', qwe);
    res.status(200).json({ news });
  } catch (error) {
    const message = error instanceof Error ? error.message : error;
    res.status(500).json({ message });
  }
};

router.get('/', getAllnews);
router.post('/', createNews);

export { router };
