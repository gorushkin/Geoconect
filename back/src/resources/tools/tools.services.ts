import path from 'path';
import AdmZip from 'adm-zip';
import { CONFIG } from '../../helpers/config';
import { CustomError } from '../../helpers/errorHanlder';
import { getPath } from '../../helpers';

const getUniqArchiveName = () => {
  const date = new Date();
  const archiveName = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}-${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}.zip`;
  return archiveName;
};

const pathToImagesFolder = getPath(CONFIG.IMAGES_FOLDER);
const pathToBackupFolder = getPath(CONFIG.BACKUP_IMAGES_FOLDER);

const backImages = async () => {
  if (!pathToImagesFolder || !pathToBackupFolder) {
    throw new CustomError('Something wrong with pathes', 500);
  }

  const archiveName = getUniqArchiveName();
  const pathToArchive = path.join(pathToBackupFolder, archiveName);
  const zip = new AdmZip();
  await zip.addLocalFolder(pathToImagesFolder);
  await zip.writeZip(pathToArchive);
  return archiveName;
};

export const tools = { backImages };
