import { PATH_ROUTES } from '../api';

export const headerList = [
  { href: '#works', name: 'Виды работ' },
  { href: '#documents', name: 'Сертификаты' },
  { href: '#news', name: 'Новости' },
  { href: '#about', name: 'О Компании' },
  { href: '#contact', name: 'Контакты' },
];

export const routes = [
  { href: PATH_ROUTES.ADMIN, name: 'Home', guest: false, user: true, admin: true, auth: true },
  { href: PATH_ROUTES.NEWS, name: 'News', guest: false, user: true, admin: true, auth: true },
  {
    href: PATH_ROUTES.NEWS_ADD,
    name: 'Add News',
    guest: false,
    user: true,
    admin: true,
    auth: true,
  },
  {
    href: PATH_ROUTES.NEWS_EDIT,
    name: 'Edit News',
    guest: false,
    user: true,
    admin: true,
    auth: true,
  },
  {
    href: PATH_ROUTES.APPLICATIONS,
    name: 'Applications',
    guest: false,
    user: true,
    admin: true,
    auth: true,
  },
  {
    href: PATH_ROUTES.ADD_USER,
    name: 'Add user',
    guest: false,
    user: false,
    admin: true,
    auth: true,
  },
  { href: PATH_ROUTES.LOGIN, name: 'Login', guest: true, user: true, admin: false, auth: false },
  { href: PATH_ROUTES.SIGN_UP, name: 'Sign up', guest: true, user: true, admin: true, auth: false },
];
