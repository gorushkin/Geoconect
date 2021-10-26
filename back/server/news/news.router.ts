import express, { Request, Response } from 'express';
import News from './news.model';

const router = express.Router();

const getAllnews = async (req: Request, res: Response) => {
  try {
    const news = await News.query();
    res.status(200).json(news);
  } catch (error) {
    const message = error instanceof Error ? error.message : error;
    res.status(500).json({ message });
  }
};

const createNews = async (req: Request, res: Response) => {
  const body = req.body;
  try {
    const news = News.fromJson(body);
    console.log('news: ', news);
    // const qwe = await News.query().insert(news);
    res.status(200).json({ news });
  } catch (error) {
    const message = error instanceof Error ? error.message : error;
    res.status(500).json({ message });
  }
};

const getNews = async (req: Request, res: Response) => {
  const {
    params: { id },
  } = req;
  const news = await News.query().findById(id);
  if (news) {
    res.status(200).json(news);
  } else {
    res.status(404).json({ message: 'Новости с этим номером нет' });
  }
};

router.get('/', getAllnews);
router.post('/', createNews);
router.get('/:id', getNews);

export { router };
