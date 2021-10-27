import axios from 'axios';
import Cookies from 'js-cookie';

import config from '../configs';

export const apiRoutes = {
  AUTH: 'auth',
  NEWS: 'news',
};

export const routes = {
  LOGIN: '/admin/login',
  NEWS: '/admin/news',
  EDIT_NEWS: '/admin/edit_news',
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

// TODO: Добавить вывод алерта с ошибкой

const errorHandler = async (promise) => {
  try {
    const { data } = await promise;
    return data;
  } catch (error) {
    const message =
      error.response && typeof error.response.data === 'object'
        ? Object.values(error.response.data).join(' \n')
        : error.message;
    console.log('message: ', message);
  }
};

export const authRequest = (data) => instance.post(apiRoutes.AUTH, data);

export const postRequest = () => instance.get(apiRoutes.NEWS);

export const createNewsRequest = (data) => errorHandler(instance.post(apiRoutes.NEWS, data));

export const getAllNewsRequest = () => errorHandler(instance.get(apiRoutes.NEWS));

export const getNewsRequest = (id) => errorHandler(instance.get(`${apiRoutes.NEWS}/${id}`));

export const updateNewsRequest = (id, data) =>
  errorHandler(instance.patch(`${apiRoutes.NEWS}/${id}`, data));

export default instance;
