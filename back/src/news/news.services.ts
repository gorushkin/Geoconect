import { FileArray } from 'express-fileupload';
import path from 'path';
const dirname = path.join(path.resolve());
import { v4 as uuid } from 'uuid';

const getFileExtension = (filename: string) => filename.split('.').pop();

const getFilename = (inputFilename: string) => {
  const fileExtension = getFileExtension(inputFilename);
  const filname = uuid();
  return `${filname}.${fileExtension}`;
};

const getPath = (inputFilename: string) => {
  const filename = getFilename(inputFilename);
  return path.join(dirname, 'images', filename);
};

export const fileHandler = async (data: FileArray) => {
  const files = Object.entries(data)
    .map(([key, value]) =>
      Array.isArray(value)
        ? value.map((item) => ({ ...item, formName: key }))
        : { ...value, formName: key }
    )
    .flat(1);

  const result = files
    .map((file) => {
      const path = getPath(file.name);
      try {
        file.mv(path);
        return path;
      } catch (error) {
        console.log('error: ', error);
        return '';
      }
    })
    .filter((file) => file);

  return result;
};
