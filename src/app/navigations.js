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
    exact: true,
  },
  {
    name: "Users",
    path: "/users",
    icon: ic_user(),
    auth: authRoles.all,
    exact: true,
  },
  {
    name: "Games",
    icon: ic_games(),
    auth: authRoles.adm,
    children: [
      {
        name: "Category",
        path: "/games/category",
        auth: authRoles.adm,
        exact: true,
      },
      {
        name: "List Games",
        path: "/games/listGames",
        auth: authRoles.adm,
        exact: true,
      },
      {
        name: "Voucher",
        path: "/games/voucher",
        auth: authRoles.all,
        exact: true,
      },
    ],
  },
  {
    name: "Sliders",
    path: "/sliders",
    icon: ic_slider(),
    auth: authRoles.adm,
    exact: true,
  },
  {
    name: "Payment Method",
    icon: ic_payment(),
    auth: authRoles.adm,
    children: [
      {
        name: "Gateway",
        path: "/payment_gateway",
        auth: authRoles.adm,
        exact: true,
      },
      {
        name: "Method",
        path: "/payment_method",
        auth: authRoles.adm,
        exact: true,
      },
    ],
  },
  {
    name: "Transaction",
    path: "/transaction",
    icon: ic_transaction(),
    auth: authRoles.all,
    exact: true,
  },
  {
    name: "Kode Promo",
    path: "/kode_promo",
    icon: "discount",
    auth: authRoles.adm,
    exact: true,
  },
  {
    name: "Admin",
    path: "/admin",
    icon: ic_user(),
    auth: authRoles.adm,
    exact: true,
  },
  {
    name: "Settings",
    icon: ic_setting(),
    auth: authRoles.adm,
    children: [
      {
        name: "General Info",
        path: "/settings/general_info",
        auth: authRoles.adm,
        exact: true,
      },
      {
        name: "FAQ",
        path: "/settings/faq",
        auth: authRoles.adm,
        exact: true,
      },
      {
        name: "S&K",
        path: "/settings/snk",
        auth: authRoles.adm,
        exact: true,
      },
      {
        name: "Privacy Policy",
        path: "/settings/privacy_policy",
        auth: authRoles.adm,
        exact: true,
      },
    ],
  },
];
