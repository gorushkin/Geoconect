import express, { Request, Response } from 'express';
import Applications from './proposals.services';
const router = express.Router();
import { errorWrapper } from '../../helpers/errorHanlder';
import { CustomError } from '../../helpers/errorHanlder';
import { authMiddleware } from '../auth/auth.services';

const getProposals = async (_req: Request, res: Response) => {
  const proposals = await Applications.getProposals();
  res.status(200).json(proposals);
};

const createProposal = async (req: Request, res: Response) => {
  const { name, phone } = req.body;
  const proposal = await Applications.addProposal(phone, name);
  res.status(200).json(proposal);
};

const getProposal = async (req: Request, res: Response) => {
  const {
    params: { id },
  } = req;

  if (!id) throw new CustomError('Proposal id is required', 400);

  const proposal = await Applications.getProposal(id);
  res.status(200).json(proposal);
};

const updateProposals = async (req: Request, res: Response) => {
  const {
    params: { id },
    body,
  } = req;

  if (!id) throw new CustomError('Proposal id is required', 403);

  const updatedProposal = await Applications.updateProposal(id, body);
  res.status(200).json(updatedProposal);
};

router.get('/', authMiddleware, errorWrapper(getProposals));
router.post('/', errorWrapper(createProposal));
router.get('/:id', authMiddleware, errorWrapper(getProposal));
router.post('/:id', authMiddleware, errorWrapper(updateProposals));

export { router };
