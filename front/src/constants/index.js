import { PATH_ROUTES } from '../api';

export const headerList = [
  { href: '#works', name: 'Виды работ' },
  { href: '#documents', name: 'Сертификаты' },
  { href: '#news', name: 'Новости' },
  { href: '#about', name: 'О Компании' },
  { href: '#contact', name: 'Контакты' },
];

export const routes = [
  { href: PATH_ROUTES.ADMIN, name: 'Home', guest: true, user: true },
  { href: PATH_ROUTES.NEWS, name: 'News', guest: false, user: true },
  { href: PATH_ROUTES.NEWS_ADD, name: 'Add News', guest: false, user: true },
  { href: PATH_ROUTES.APPLICATIONS, name: 'Applications', guest: false, user: true },
  { href: PATH_ROUTES.ADD_USER, name: 'Add user', guest: false, user: true },
];
