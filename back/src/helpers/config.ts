import * as dotenv from 'dotenv';
dotenv.config();

const {
  PORT,
  NODE_ENV,
  SECRET = 'default',
  SMTP_LOGIN,
  SMTP_PASSWORD,
  SMTP_HOST = '',
  SMTP_PORT = 465,
  SMTP_TEST_MAIL_ADDRESS,
} = process.env;

export const CONFIG = {
  PORT,
  NODE_ENV,
  SECRET,
  SMTP_LOGIN,
  SMTP_PASSWORD,
  SMTP_HOST,
  SMTP_PORT: Number(SMTP_PORT),
  SMTP_TEST_MAIL_ADDRESS,
  SMTP: {
    login: SMTP_LOGIN,
    password: SMTP_PASSWORD,
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    address: SMTP_TEST_MAIL_ADDRESS ? SMTP_TEST_MAIL_ADDRESS : '',
  },
};
