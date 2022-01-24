import Proposal from './proposals.model';
import { CustomError } from '../../helpers/errorHanlder';

export const getProposals = async () => {
  return await Proposal.query();
};

export const addProposal = async (phone: string, email: string) => {
  const newProposal = Proposal.fromJson({ email, phone });
  return await Proposal.query().insert(newProposal);
};

export const getProposal = async (id: string) => {
  const proposal = await Proposal.query().findById(id);
  if (!proposal) throw new CustomError('Something wrong!', 403);
  return proposal;
};

export const updateProposal = async (id: string, body: any) => {
  const updatedProposals = await Proposal.query().findById(id).patchAndFetchById(id, body);

  if (!updatedProposals) throw new CustomError('News id is required', 400);
  return updatedProposals;
};

export default { getProposals, addProposal, getProposal, updateProposal };
