import { FileArray } from 'express-fileupload';
import path from 'path';
const dirname = path.join(path.resolve());
import { v4 as uuid } from 'uuid';
import { promises as fs } from 'fs';

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
// TODO: если нет папки для картинок, то следует ее создавать

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
