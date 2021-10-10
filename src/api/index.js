import axios from 'axios';
import config from '../configs';

export const routes = {
  AUTH: '/auth',
};

const instance = axios.create({
  baseURL: `${config.ORIGIN}${config.API_BASE_URL}`,
});

export const authRequest = (data) => instance.post(routes.AUTH, data)

export default instance
