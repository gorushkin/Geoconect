import axios from 'axios';

const routes = {
  AUTH: '/auth',
};

import config from '../configs';

const instance = axios.create({
  baseURL: `${config.ORIGIN}${config.API_BASE_URL}`,
});

export const authRequest = (data) => {
  return instance.post(routes.AUTH, data);
};
