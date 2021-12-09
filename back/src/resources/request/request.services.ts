import Requests from './request.model';

export const getRequests = async () => {
  const requests = await Requests.query();
  return requests;
};

export const addRequest = async (phone: string, email: string) => {
  const newRequest = Requests.fromJson({ email, phone });
  const request = await Requests.query().insert(newRequest);
  return request;
};

export default { getRequests, addRequest };
