import React from "react";
import { Redirect } from "react-router-dom";

import dashboardRoutes from "./views/dashboard/DashboardRoutes";
import profileRoutes from "./views/Profile/ProfileRoutes";
import setifikatRoute from "./views/Manajemen/Sertifikat/SertifikatRoutes";

const redirectRoute = [
  {
    path: "/",
    exact: true,
    component: () => <Redirect to="/home" />,
  },
];

const errorRoute = [
  {
    component: () => <Redirect to="/session/404" />,
  },
];

const routes = [
  ...dashboardRoutes,
  ...setifikatRoute,
  ...profileRoutes,
  ...redirectRoute,
  ...errorRoute,
];

export default routes;
