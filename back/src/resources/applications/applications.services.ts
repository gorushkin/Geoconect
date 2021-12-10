import Applications from './applications.model';
import { CustomError } from '../../helpers/errorHanlder';

export const getApplications = async () => {
  return await Applications.query();
};

export const addApplications = async (phone: string, email: string) => {
  const newRequest = Applications.fromJson({ email, phone });
  return await Applications.query().insert(newRequest);
};

export const getApplication = async (id: string) => {
  const application = await Applications.query().findById(id);
  if (!application) throw new CustomError('Something wrong!', 403);
  return application;
};

export const updateApplication = async (id: string, body: any) => {
  const updatedApplication = await Applications.query().findById(id).patchAndFetchById(id, body);

  if (!updatedApplication) throw new CustomError('News id is required', 400);
  return updatedApplication;
};

export default { getApplications, addApplications, getApplication, updateApplication };
