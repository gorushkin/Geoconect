import axios from 'axios';
import Cookies from 'js-cookie';

import store, { actions } from '../slices';

const serverTypeMapping = {
  dev: process.env.NEXT_PUBLIC_DEV_ORIGIN,
  local: process.env.NEXT_PUBLIC_LOCAL_ORIGIN,
};

const ORIGIN = serverTypeMapping[process.env.NEXT_PUBLIC_TYPE] || process.env.NEXT_PUBLIC_ORIGIN;

const config = {
  API_BASE_URL: '/api/',
  ORIGIN,
};

export const apiRoutes = {
  AUTH: 'auth',
  NEWS: 'news',
  USERS: 'users',
  IMAGES: 'images',
  TEST: 'test',
  AUTH__TEST: 'authtest',
};

export const routes = {
  LOGIN: '/admin/login',
  NEWS: '/admin/news',
  EDIT_NEWS: '/admin/edit_news',
  IMAGES: `${config.ORIGIN}/images`,
};

const instance = axios.create({
  baseURL: `${config.ORIGIN}${config.API_BASE_URL}`,
});

instance.interceptors.request.use(
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

const errorHandler = async (promise) => {
  try {
    return await promise;
  } catch (error) {
    const message =
      error.response && typeof error.response.data === 'object'
        ? Object.values(error.response.data).join('\n')
        : error.response?.data || error.message;
    if (message) {
      store.dispatch(actions.showAlert({ body: message, color: 'danger' }));
    } else {
      throw Error(error);
    }
  }
};

export const authRequest = (data) => errorHandler(instance.post(apiRoutes.AUTH, data));

export const postRequest = () => errorHandler(instance.get(apiRoutes.NEWS));

export const createNewsRequest = (data) => {
  const formData = new FormData();
  formData.append('imgSource', data.file);
  formData.append('title', data.title);
  formData.append('body', data.body);
  return errorHandler(instance.post(apiRoutes.NEWS, formData));
};

export const getAllNewsRequest = () => errorHandler(instance.get(apiRoutes.NEWS));

export const getNewsRequest = (id) => errorHandler(instance.get(`${apiRoutes.NEWS}/${id}`));

export const updateNewsRequest = (id, data) => {
  const formData = new FormData();
  if (data.file) formData.append('imgSource', data.file);
  formData.append('title', data.title);
  formData.append('body', data.body);
  return errorHandler(instance.patch(`${apiRoutes.NEWS}/${id}`, formData));
};

export const deleteNewsRequest = (id) => errorHandler(instance.delete(`${apiRoutes.NEWS}/${id}`));

export const createUserRequest = (data) => errorHandler(instance.post(apiRoutes.USERS, data));
export const testRequest = () => errorHandler(instance.post(apiRoutes.AUTH__TEST));

export default instance;
