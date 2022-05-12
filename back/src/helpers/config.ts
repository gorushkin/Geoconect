import * as dotenv from 'dotenv';
import { CustomError } from './errorHanlder';
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
  SENTRY_DSN,
  BACKUP_FOLDER,
  IMAGES_FOLDER,
  BACKUP_DB_FOLDER,
  BACKUP_IMAGES_FOLDER,
  IMAGES_FOLDER_PATH,
  DB_PATH,
  ADMIN_LOGIN,
  ADMIN_PASSW,
  DB_NAME,
} = process.env;

if (!IMAGES_FOLDER_PATH) {
  throw new CustomError('Upload images folder is not defined', 500);
}

if (!ADMIN_PASSW) {
  throw new CustomError('Add admin data to config', 500);
}

export const CONFIG = {
  PORT,
  NODE_ENV,
  SECRET,
  SMTP_LOGIN,
  SMTP_PASSWORD,
  SMTP_HOST,
  SMTP_PORT: Number(SMTP_PORT),
  SMTP_TEST_MAIL_ADDRESS,
  SENTRY_DSN,
  BACKUP_FOLDER,
  IMAGES_FOLDER,
  BACKUP_DB_FOLDER,
  BACKUP_IMAGES_FOLDER,
  IMAGES_FOLDER_PATH,
  DB_PATH,
  DB_NAME,
  ADMIN_LOGIN,
  ADMIN_PASSW,
  SMTP: {
    login: SMTP_LOGIN,
    password: SMTP_PASSWORD,
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    address: SMTP_TEST_MAIL_ADDRESS ? SMTP_TEST_MAIL_ADDRESS : '',
  },
};
