<<<<<<< HEAD
import { authRoles } from './auth/authRoles';

export const navigations = [
  {
    name: 'Dashboard',
    path: '/dashboard',
    icon: 'dashboard_customize',
    auth: authRoles.all,
  },
  {
    name: 'Users',
    path: '/sertifikat_penghargaan',
    icon: 'dashboard_customize',
    auth: authRoles.all,
  },
  {
    name: 'Games',
    icon: 'manage_accounts',
    auth: authRoles.all,
    children: [
      {
        name: 'Category',
        path: '/kategori_manajemen',
=======
import { authRoles } from "./auth/authRoles";
import {
  ic_dashboard,
  ic_games,
  ic_payment,
  ic_setting,
  ic_slider,
  ic_transaction,
  ic_user,
} from "./assets/components/exportIcons";

export const navigations = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: ic_dashboard(),
    auth: authRoles.all,
  },
  {
    name: "Users",
    path: "/users",
    icon: ic_user(),
    auth: authRoles.all,
  },
  {
    name: "Games",
    icon: ic_games(),
    auth: authRoles.all,
    children: [
      {
        name: "Category",
        path: "/games_category",
>>>>>>> 170b5c39287197918714e412fb8ca55689d12c8f
        auth: authRoles.all,
      },
      {
        name: 'List Games',
        path: '/data_manajemen',
        auth: authRoles.all,
      },
    ],
  },
  {
<<<<<<< HEAD
    name: 'Sliders',
    path: '/sliders',
    icon: 'dashboard_customize',
    auth: authRoles.all,
  },
  {
    name: 'Payment Method',
    path: '/payment_gateway',
    icon: 'dashboard_customize',
    auth: authRoles.all,
  },
  {
    name: 'Transaction',
    path: '/404',
    icon: 'dashboard_customize',
    auth: authRoles.all,
  },
  {
    name: 'Settings',
    icon: 'manage_accounts',
=======
    name: "Sliders",
    path: "/404",
    icon: ic_slider(),
    auth: authRoles.all,
  },
  {
    name: "Payment Method",
    path: "/404",
    icon: ic_payment(),
    auth: authRoles.all,
  },
  {
    name: "Transaction",
    path: "/404",
    icon: ic_transaction(),
    auth: authRoles.all,
  },
  {
    name: "Settings",
    icon: ic_setting(),
>>>>>>> 170b5c39287197918714e412fb8ca55689d12c8f
    auth: authRoles.all,
    children: [
      {
        name: 'General Indo',
        path: '/404',
        auth: authRoles.all,
      },
      {
        name: 'FAQ',
        path: '/404',
        auth: authRoles.all,
      },
      {
        name: 'FAQ',
        path: '/404',
        auth: authRoles.all,
      },
      {
        name: 'S&K',
        path: '/404',
        auth: authRoles.all,
      },
      {
        name: 'Privacy Policy',
        path: '/404',
        auth: authRoles.all,
      },
    ],
  },
];
