import axios from 'axios';
import config from '../configs';
import Cookies from 'js-cookie';

export const apiRoutes = {
  AUTH: 'auth',
  POSTS: 'posts',
};

export const routes = {
  LOGIN: '/admin/login',
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

export const postRequest = () => instance.get(apiRoutes.POSTS);

export default instance;
