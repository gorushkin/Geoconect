import axios from 'axios';
import Cookies from 'js-cookie';

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
  IMAGES: 'images',
};

export const routes = {
  LOGIN: '/admin/login',
  NEWS: '/admin/news',
  EDIT_NEWS: '/admin/edit_news',
  IMAGES: `${config.ORIGIN}/images`,
};

const token = Cookies.get('token');

const instance = axios.create({
  baseURL: `${config.ORIGIN}${config.API_BASE_URL}`,
  ...(token && {
    headers: {
      Authorization: token,
    },
  }),
});

console.log(`${config.ORIGIN}${config.API_BASE_URL}`);
// TODO: Добавить вывод алерта с ошибкой

const errorHandler = async (promise) => {
  try {
    return await promise;
  } catch (error) {
    const message =
      error.response && typeof error.response.data === 'object'
        ? Object.values(error.response.data).join(' \n')
        : error.message;
    console.log('message: ', message);
    return { data: null };
  }
};

export const authRequest = (data) => instance.post(apiRoutes.AUTH, data);

export const postRequest = () => instance.get(apiRoutes.NEWS);

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

export default instance;
