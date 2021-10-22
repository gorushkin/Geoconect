import express from 'express';

import { getNews } from './news.service.js';
const router = express.Router();

const getAllnews = async (req, res) => {
  const news = await getNews();
  res.status(200).json({ news });
};

router.get('/', getAllnews);

export { router };
