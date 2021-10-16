import axios from 'axios';
import config from '../configs';
import Cookies from 'js-cookie';

export const routes = {
  AUTH: 'auth',
  POSTS: 'posts',
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




export const authRequest = (data) => instance.post(routes.AUTH, data);

export const postRequest = () => instance.get(routes.POSTS);

export default instance;
