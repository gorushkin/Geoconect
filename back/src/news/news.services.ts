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

const getPath = (filename: string) => path.join(dirname, 'images', filename);

export const fileHandler = async (data: FileArray | undefined) => {
  if (!data) return [];
  const files = Object.entries(data)
    .map(([key, value]) =>
      Array.isArray(value)
        ? value.map((item) => ({ ...item, formName: key }))
        : { ...value, formName: key }
    )
    .flat(1);

  const result = files
    .map((file) => {
      try {
        const filename = getFilename(file.name);
        const path = getPath(filename);
        file.mv(path);
        return filename;
      } catch (error) {
        console.log('error: ', error);
        return '';
      }
    })
    .filter((file) => file);

  return result;
};
