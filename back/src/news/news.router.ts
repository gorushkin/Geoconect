import express, { Request, Response } from 'express';
import News from './news.model';
import { fileHandler, imgRemover } from './news.services';
import { FileArray } from 'express-fileupload';

// TODO: при редкатировании создавать копии в другой таблице для отката

const router = express.Router();

const getAllnews = async (_req: Request, res: Response) => {
  try {
    const newsList = await News.query();
    res.status(200).json(newsList);
  } catch (error) {
    const message = error instanceof Error ? error.message : error;
    res.status(500).json({ message });
  }
};

const createNews = async (req: Request, res: Response) => {
  try {
    const imgSoruce = req.files ? await fileHandler(req.files as FileArray | undefined) : undefined;
    const newsItem = News.fromJson({ ...req.body, ...(imgSoruce && { img_src: imgSoruce }) });
    await News.query().insert(newsItem);
    res.status(200).json(newsItem);
  } catch (error) {
    const message = error instanceof Error ? error.message : error;
    res.status(500).json({ message });
  }
};

const getNews = async (req: Request, res: Response) => {
  const {
    params: { id },
  } = req;
  if (id) {
    const newsItem = await News.query().findById(id);
    if (newsItem) {
      res.status(200).json(newsItem);
    } else {
      res.status(404).json({ message: 'Новости с этим номером нет' });
    }
  } else {
    res.status(404).json({ message: 'Новости с этим номером нет' });
  }
};

const updateNews = async (req: Request, res: Response) => {
  const {
    params: { id },
    body,
    files,
  } = req;
  try {
    if (id) {
      const newsItem = await News.query().findById(id);

      const imgSoruce = files ? await fileHandler(files as FileArray | undefined) : undefined;

      if (imgSoruce) {
        const previousImgName = newsItem.img_src;
        await imgRemover(previousImgName);
      }

      const updatedNewsItem = await News.query()
        .findById(id)
        .patch({ ...body, ...(imgSoruce && { img_src: imgSoruce }) });

      if (updatedNewsItem) {
        res.status(200).json(updatedNewsItem);
      } else {
        res.status(404).json({ message: 'Новости с этим номером нет' });
      }
    } else {
      res.status(404).json({ message: 'Новости с этим номером нет' });
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : error;
    res.status(500).json({ message });
  }
};

const deleteNews = async (req: Request, res: Response) => {
  const {
    params: { id },
  } = req;
  if (id) {
    const newsItem = await News.query().findById(id);
    const imgName = newsItem.img_src;
    const deletedNewsItem = await News.query().deleteById(id);
    if (deletedNewsItem) {
      res.status(200).json(deletedNewsItem);
      await imgRemover(imgName);
    } else {
      res.status(404).json({ message: 'Что-то пошло не так' });
    }
  } else {
    res.status(404).json({ message: 'Новости с этим номером нет' });
  }
};

router.get('/', getAllnews);
router.post('/', createNews);
router.get('/:id', getNews);
router.patch('/:id', updateNews);
router.delete('/:id', deleteNews);

export { router };
