import express, { Request, Response } from 'express';
import News from './news.model';
import { news } from './news.services';
import { CustomError } from '../../helpers/errorHanlder';

// TODO: при редкатировании создавать копии в другой таблице для отката

const router = express.Router();
import { errorWrapper } from '../../helpers/errorHanlder';

const getAllnews = async (_req: Request, res: Response) => {
  const newsList = await News.query();
  res.status(200).json(newsList);
};

const createNews = async (req: Request, res: Response) => {
  const newsItem = await news.addNews(req);
  res.status(200).json(newsItem);
};

const getNews = async (req: Request, res: Response) => {
  const {
    params: { id },
  } = req;

  if (!id) throw new CustomError('News id is required', 400);

  const newsItem = await news.getNews(id);
  res.status(200).json(newsItem);
};

const updateNews = async (req: Request, res: Response) => {
  const {
    params: { id },
    body,
    files,
  } = req;

  if (!id) throw new CustomError('News id is required', 400);

  const updatedNewsItem = await news.updateNews(id, body, files);
  res.status(200).json(updatedNewsItem);
};

const deleteNews = async (req: Request, res: Response) => {
  const {
    params: { id },
  } = req;

  if (!id) throw new CustomError('News id is required', 400);

  const deletedNewsItem = await news.deleteNews(id);
  res.status(200).json(deletedNewsItem);
};

router.get('/', errorWrapper(getAllnews));
router.post('/', errorWrapper(createNews));
router.get('/:id', errorWrapper(getNews));
router.patch('/:id', errorWrapper(updateNews));
router.delete('/:id', errorWrapper(deleteNews));

export { router };
