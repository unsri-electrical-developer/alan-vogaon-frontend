import { authRoles } from './auth/authRoles';
import {
  ic_dashboard,
  ic_games,
  ic_payment,
  ic_setting,
  ic_slider,
  ic_transaction,
  ic_user,
} from './assets/components/exportIcons';

export const navigations = [
  {
    name: 'Dashboard',
    path: '/dashboard',
    icon: ic_dashboard(),
    auth: authRoles.all,
    exact: true,
  },
  {
    name: 'Users',
    path: '/users',
    icon: ic_user(),
    auth: authRoles.all,
    exact: true,
  },
  {
    name: 'Games',
    icon: ic_games(),
    auth: authRoles.all,
    children: [
      {
        name: 'Category',
        path: '/games_category',
        auth: authRoles.all,
        exact: true,
      },
      {
        name: 'List Games',
        path: '/data_manajemen',
        auth: authRoles.all,
        exact: true,
      },
    ],
  },
  {
    name: 'Sliders',
    path: '/sliders',
    icon: ic_slider(),
    auth: authRoles.all,
    exact: true,
  },
  {
    name: 'Payment Method',
    icon: ic_payment(),
    auth: authRoles.all,
    children: [
      {
        name: 'Gateway',
        path: '/payment_gateway',
        auth: authRoles.all,
        exact: true,
      },
      {
        name: 'Method',
        path: '/payment_method',
        auth: authRoles.all,
        exact: true,
      },
    ],
  },
  {
    name: 'Transaction',
    path: '/404',
    icon: ic_transaction(),
    auth: authRoles.all,
    exact: true,
  },
  {
    name: 'Settings',
    icon: ic_setting(),
    auth: authRoles.all,
    children: [
      {
        name: 'General Info',
        path: '/general_info',
        auth: authRoles.all,
        exact: true,
      },
      {
        name: 'FAQ',
        path: '/faq',
        auth: authRoles.all,
        exact: true,
      },
      {
        name: 'S&K',
        path: '/404',
        auth: authRoles.all,
        exact: true,
      },
      {
        name: 'Privacy Policy',
        path: '/404',
        auth: authRoles.all,
        exact: true,
      },
    ],
  },
];
