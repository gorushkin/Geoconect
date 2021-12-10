import { FileArray } from 'express-fileupload';
import path from 'path';
const dirname = path.join(path.resolve());
import { v4 as uuid } from 'uuid';
import { promises as fs } from 'fs';
import express, { Request, Response } from 'express';
import News from './news.model';
import { CustomError } from '../../helpers/errorHanlder';

const getFileExtension = (filename: string) => filename.split('.').pop();

const getFilename = (inputFilename: string) => {
  const fileExtension = getFileExtension(inputFilename);
  const filname = uuid();
  return `${filname}.${fileExtension}`;
};

const checkFolder = async (path: string) => {
  try {
    await fs.lstat(path);
  } catch (error) {
    await fs.mkdir(path);
  }
};

const getPath = (filename?: string) => path.join(dirname, 'images', filename ? filename : '');

export const fileHandler = async (data: FileArray | undefined) => {
  if (!data) throw Error('something wrong with image');
  const file = data['imgSource'];
  if (Array.isArray(file) || !file) throw Error('something wrong with image');
  const filename = getFilename(file.name);
  const path = getPath(filename);
  const folderPath = getPath();
  await checkFolder(folderPath);
  try {
    await fs.writeFile(path, file.data);
    return filename;
  } catch (error) {
    const message = error instanceof Error ? error.message : error;
    // TODO: надо кидать исключение с ошибкой отсюда
    return undefined;
  }
};

export const imgRemover = async (filename: string) => {
  const filePath = getPath(filename);
  try {
    fs.unlink(filePath);
  } catch (error) {
    const message = error instanceof Error ? error.message : error;
    console.log(message);
  }
};

export const addNews = async (req: Request) => {
  const imgSoruce = req.files ? await fileHandler(req.files as FileArray | undefined) : undefined;
  const newsItem = News.fromJson({ ...req.body, ...(imgSoruce && { img_src: imgSoruce }) });
  return await News.query().insert(newsItem);
};

export const getNews = async (id: string) => {
  const newsItem = await News.query().findById(id);
  if (!newsItem) throw new CustomError('Новости с этим номером нет!', 403);
  return newsItem;
};

export const updateNews = async (id: string, body: any, files: FileArray | undefined) => {
  const newsItem = await News.query().findById(id);
  const imgSoruce = files ? await fileHandler(files as FileArray | undefined) : undefined;

  if (imgSoruce) {
    const previousImgName = newsItem.img_src;
    await imgRemover(previousImgName);
  }

  const updatedNewsItem = await News.query().patchAndFetchById(id, {
    ...body,
    ...(imgSoruce && { img_src: imgSoruce }),
  });

  // TODO: Переделать ошибку.

  if (!updatedNewsItem) throw new CustomError('News id is required', 400);
  return updatedNewsItem;
};

export const deleteNews = async (id: string) => {
  const newsItem = await News.query().findById(id);
  const imgName = newsItem.img_src;
  const deletedNewsItem = await News.query().deleteById(id);

  if (!deletedNewsItem) throw new CustomError('Что-то пошло не так', 400);

  await imgRemover(imgName);
  return deletedNewsItem;
};

export const news = { addNews, getNews, updateNews, deleteNews };
