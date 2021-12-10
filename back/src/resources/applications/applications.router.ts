import express, { Request, Response } from 'express';
import Applications from './applications.services';
const router = express.Router();
import { errorWrapper } from '../../helpers/errorHanlder';
import { CustomError } from '../../helpers/errorHanlder';

const getApplications = async (_req: Request, res: Response) => {
  const applications = await Applications.getApplications();
  res.status(200).json(applications);
};

const createApplication = async (req: Request, res: Response) => {
  const { email, phone } = req.body;
  const application = await Applications.addApplications(phone, email);
  res.status(200).json(application);
};

const getApplication = async (req: Request, res: Response) => {
  const {
    params: { id },
  } = req;

  if (!id) throw new CustomError('News id is required', 400);

  const application = await Applications.getApplication(id);
  res.status(200).json(application);
};

const updateApplication = async (req: Request, res: Response) => {
  const {
    params: { id },
    body,
  } = req;

  if (!id) throw new CustomError('Apllication id is required', 403);

  const updatedApplication = await Applications.updateApplication(id, body);
  res.status(200).json(updatedApplication);
};

router.get('/', errorWrapper(getApplications));
router.post('/', errorWrapper(createApplication));
router.get('/:id', errorWrapper(getApplication));
router.post('/:id', errorWrapper(updateApplication));

export { router };
