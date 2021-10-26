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

export const authRequest = (data) => instance.post(apiRoutes.AUTH, data);

export const postRequest = () => instance.get(apiRoutes.NEWS);

export const createNewsRequest = (data) => instance.post(apiRoutes.NEWS, data);

export const getAllNewsRequest = () => instance.get(apiRoutes.NEWS);

export const getNewsRequest = (id) => instance.get(`${apiRoutes.NEWS}/${id}`);

export default instance;
