import express, { Request, Response } from 'express';
import Requests from './request.services';
const router = express.Router();

const getRequests = async (_req: Request, res: Response) => {
  const requests = Requests.getRequests();
  res.status(200).send(requests);
};

const createRequest = async (req: Request, res: Response) => {
  const { email, phone } = req.body;
  await Requests.createRequest(phone, email);
  res.status(200).send('createRequest');
};

router.get('/', getRequests);
router.post('/', createRequest);

export { router };
