import express, { Request, Response } from 'express';
import { tools } from './tools.services';

const router = express.Router();
import { errorWrapper } from '../../helpers/errorHanlder';
import { CustomError } from '../../helpers/errorHanlder';
import { authMiddleware } from '../auth/auth.services';

const backupImages = async (_req: Request, res: Response) => {
  const archiveName = await tools.backImages();
  if (!archiveName) throw new CustomError('Something went wrong', 500);

  res.status(200).json(archiveName);
};

const backupDB = async () => {
  console.log('backupDB');
};

router.get('/images', errorWrapper(backupImages));
router.get('/db', errorWrapper(backupDB));

export { router };
