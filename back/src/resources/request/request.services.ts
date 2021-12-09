import Requests from './request.model';

export const getRequests = () => [];

export const createRequest = async (phone: string, email: string) => {
  const request = Requests.fromJson({email, phone})
  console.log('request: ', request);
};

export default { getRequests, createRequest };
