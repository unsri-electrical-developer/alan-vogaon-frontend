import { authRoles } from "./auth/authRoles";

export const navigations = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: "dashboard_customize",
    auth: authRoles.all,
  },
  {
    name: "Users",
    path: "/sertifikat_penghargaan",
    icon: "dashboard_customize",
    auth: authRoles.all,
  },
  {
    name: "Games",
    icon: "manage_accounts",
    auth: authRoles.all,
    children: [
      {
        name: "Category",
        path: "/kategori_manajemen",
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
    icon: "dashboard_customize",
    auth: authRoles.all,
  },
  {
    name: "Payment Method",
    path: "/404",
    icon: "dashboard_customize",
    auth: authRoles.all,
  },
  {
    name: "Transaction",
    path: "/404",
    icon: "dashboard_customize",
    auth: authRoles.all,
  },
  {
    name: "Settings",
    icon: "manage_accounts",
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
