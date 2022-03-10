import express, { RequestHandler } from 'express';
import { CONFIG } from '../../helpers/config';
import { getPath } from '../../helpers';
import path from 'path';

const router = express.Router();

import { errorWrapper } from '../../helpers/errorHanlder';

const pathToBackupFolder = getPath(CONFIG.BACKUP_IMAGES_FOLDER) || '';

const getFile: RequestHandler = async (req, res) => {
  const {
    params: { filename },
  } = req;

  if (filename) {
    const pathToFile = path.join(pathToBackupFolder, filename);
    res.download(pathToFile);
  } else {
    res.redirect(301, '/admin/tools');
  }
};

router.get('/:filename', errorWrapper(getFile));

export { router };
