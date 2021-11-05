import { UploadedFile, FileArray } from 'express-fileupload';
// import { v4 as uuidv4 } from 'uuid';
import path from 'path';
const dirname = path.join(path.resolve());
import { promises as fs } from 'fs';

const getPath = (filename: string) => {
  return path.join(dirname, 'images', filename);
};

// export const fileHandler = async (file: UploadedFile) => {
//   const date = new Date();
//   const currentDate = `${date.getFullYear()}${date.getMonth()}${date.getMonth()}${date.getDay()}${date.getHours()}${date.getMinutes()}${date.getSeconds()}`;
//   const uploadPath = path.join(dirname, 'images', currentDate);
//   try {
//     await fs.writeFile(uploadPath, file.data);
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const fileHandler = async (files: UploadedFile[]) => {
//   console.log(dirname);
//   console.log(files);
//   console.log(process.cwd());
//   // console.log(file.name);
//   // files.forEach((element: UploadedFile) => {
//   //   console.log(element.name);
//   // });
//   // console.log('fileHandler');
//   const date = new Date();
//   const currentDate = `${date.getFullYear()}${date.getMonth()}${date.getMonth()}${date.getDay()}${date.getHours()}${date.getMinutes()}${date.getSeconds()}`;
//   const uploadPath = path.join(dirname, currentDate);
//   console.log('uploadPath: ', uploadPath);
//   try {
//     files.forEach((file) => {
//       console.log(file);
//     });
//   } catch (error) {
//     console.log(error);
//   }
//   // const filename = date.getDate();
// };

export const fileHandler = async (data: FileArray) => {
  console.log(data);
  const date = new Date();
  const files = Object.values(data).map((file) => {
    if (Array.isArray(file)) {
      return file.map((file) => file.mv(getPath(file.name)));
    }
    return file.mv(getPath(file.name));
  });

  console.log('files: ', files);
};
