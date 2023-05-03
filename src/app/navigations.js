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
        auth: authRoles.all,
      },
      {
        name: "List Games",
        path: "/data_manajemen",
        auth: authRoles.all,
      },
    ],
  },
  {
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
    auth: authRoles.all,
    children: [
      {
        name: "General Indo",
        path: "/404",
        auth: authRoles.all,
      },
      {
        name: "FAQ",
        path: "/404",
        auth: authRoles.all,
      },
      {
        name: "FAQ",
        path: "/404",
        auth: authRoles.all,
      },
      {
        name: "S&K",
        path: "/404",
        auth: authRoles.all,
      },
      {
        name: "Privacy Policy",
        path: "/404",
        auth: authRoles.all,
      },
    ],
  },
];
