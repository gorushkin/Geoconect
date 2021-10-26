import { serialize } from 'cookie';

import store, { actions } from '../slices';

const cookie = (res, name, value, options = {}) => {
  const stringValue = typeof value === 'object' ? 'j:' + JSON.stringify(value) : String(value);

  if ('maxAge' in options) {
    options.expires = new Date(Date.now() + options.maxAge);
    options.maxAge /= 1000;
  }

  res.setHeader('Set-Cookie', serialize(name, String(stringValue), options));
};

const cookies = (handler) => (req, res) => {
  res.cookie = (name, value, options) => cookie(res, name, value, options);

  return handler(req, res);
};

export default cookies;

export const showModalWindow = (data) => {
  store.dispatch(actions.showModal(data));
};
