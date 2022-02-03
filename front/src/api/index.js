import axios from 'axios';
import Cookies from 'js-cookie';

import store, { actions } from '../slices';

// const serverTypeMapping = {
//   dev: process.env.NEXT_PUBLIC_DEV_ORIGIN,
//   local: process.env.NEXT_PUBLIC_LOCAL_ORIGIN,
// };

// const ORIGIN_CSR =
//   serverTypeMapping[process.env.NEXT_PUBLIC_TYPE] || process.env.NEXT_PUBLIC_ORIGIN;

const config = {
  API_BASE_URL: '/api/',
  ORIGIN_CSR: '',
  ORIGIN_SRR: `http://${process.env.SSR_ORIGIN}`,
};

export const apiRoutes = {
  AUTH: 'auth',
  NEWS: 'news',
  USERS: 'users',
  IMAGES: 'images',
  TEST: 'test',
  AUTH__TEST: 'authtest',
  APPLICATIONS: 'applications',
  INFO: 'info',
};

export const PATH_ROUTES = {
  ADMIN: '/admin',
  LOGIN: '/admin',
  // LOGIN: '/admin/login',
  SIGN_UP: '/admin/signup',
  NEWS: '/admin/news',
  NEWS_EDIT: '/admin/edit_news',
  NEWS_ADD: '/admin/add_news',
  APPLICATIONS: '/admin/applications',
  APPLICATION_EDIT: '/admin/edit_application',
  IMAGES: `${config.ORIGIN_CSR}/images`,
  ADD_USER: '/admin/add_user',
};

const instanse = {
  ssr: axios.create({
    baseURL: `${config.ORIGIN_SRR}${config.API_BASE_URL}`,
  }),
  csr: axios.create({
    baseURL: `${config.ORIGIN_CSR}${config.API_BASE_URL}`,
  }),
};

instanse.csr.interceptors.request.use(
  (config) => {
    const token = Cookies.get('token');

    if (token) {
      config.headers.Authorization = token;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// TODO: вывод ошибок с новой строки

const errorHandler = async (promise, toState = false) => {
  try {
    return await promise;
  } catch (error) {
    const message =
      error.response && typeof error.response.data === 'object'
        ? Object.values(error.response.data).join('\n')
        : error.response?.data || error.message;
    if (message) {
      if (message === 'UNAUTHORIZED') {
        store.dispatch(actions.logout());
      }
      store.dispatch(actions.showAlert({ body: message, color: 'danger' }));
      if (toState) throw Error();
      return { data: null };
    } else {
      throw Error(error);
    }
  }
};

// withStoreRequestError для добавиления пустых данных в стейт

const withStoreRequestError = (promise) => errorHandler(promise, true);

export const authRequest = (data) => withStoreRequestError(instanse.csr.post(apiRoutes.AUTH, data));

export const postRequest = () => errorHandler(instanse.csr.get(apiRoutes.NEWS));

export const createNewsRequest = (data) => {
  const formData = new FormData();
  formData.append('imgSource', data.file);
  formData.append('title', data.title);
  formData.append('body', data.body);
  return errorHandler(instanse.csr.post(apiRoutes.NEWS, formData));
};

export const getAllNewsRequest = (instance) => () => errorHandler(instance.get(apiRoutes.NEWS));

export const getAllNewsRequestSSR = getAllNewsRequest(instanse.ssr);
export const getAllNewsRequestCSR = getAllNewsRequest(instanse.csr);

export const getNewsRequest = (id) => errorHandler(instanse.csr.get(`${apiRoutes.NEWS}/${id}`));

export const updateNewsRequest = (id, data) => {
  const formData = new FormData();
  if (data.file) formData.append('imgSource', data.file);
  formData.append('title', data.title);
  formData.append('body', data.body);
  return errorHandler(instanse.csr.patch(`${apiRoutes.NEWS}/${id}`, formData));
};

export const deleteNewsRequest = (id) =>
  errorHandler(instanse.csr.delete(`${apiRoutes.NEWS}/${id}`));

export const createUserRequest = (data) =>
  withStoreRequestError(instanse.csr.post(apiRoutes.USERS, data));

export const testRequest = () => errorHandler(instanse.csr.post(apiRoutes.AUTH__TEST));

export const getServerInfoRequest = () => errorHandler(instanse.csr.get(apiRoutes.INFO));

export const getAllApplicationsRequest = () =>
  errorHandler(instanse.csr.get(apiRoutes.APPLICATIONS));

export const createApplicationRequest = (data) =>
  errorHandler(instanse.csr.post(apiRoutes.APPLICATIONS, data));

export const getApplicationRequest = (id) =>
  errorHandler(instanse.csr.get(`${apiRoutes.APPLICATIONS}/${id}`));

export const updateApplicationRequest = (id, data) =>
  errorHandler(instanse.csr.post(`${apiRoutes.APPLICATIONS}/${id}`, data));

export default instanse;
