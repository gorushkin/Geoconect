import express, { Request, Response } from 'express';
import Requests from './request.services';
const router = express.Router();
import { errorWrapper } from '../../helpers/errorHanlder';

const getRequests = async (_req: Request, res: Response) => {
  const requests = await Requests.getRequests();
  res.status(200).send(requests);
};

const createRequest = async (req: Request, res: Response) => {
  const { email, phone } = req.body;
  const request = await Requests.addRequest(phone, email);
  res.status(200).send(request);
};

router.get('/', errorWrapper(getRequests));
router.post('/', errorWrapper(createRequest));

export { router };
