import { PATH_ROUTES } from '../api';

export const headerList = [
  { href: '#works', name: 'Виды работ' },
  { href: '#documents', name: 'Сертификаты' },
  { href: '#news', name: 'Новости' },
  { href: '#about', name: 'О Компании' },
  { href: '#contact', name: 'Контакты' },
];

export const routes = [
  { href: PATH_ROUTES.ADMIN, name: 'Home', closed: false },
  { href: PATH_ROUTES.NEWS, name: 'News', closed: true },
  { href: PATH_ROUTES.NEWS_ADD, name: 'Add News', closed: true },
  { href: PATH_ROUTES.APPLICATIONS, name: 'Applications', closed: true },
  { href: PATH_ROUTES.LOGIN, name: 'Login', closed: false },
  { href: PATH_ROUTES.SIGN_UP, name: 'Sign Up', closed: false },
];
