import React from "react";
import { Redirect } from "react-router-dom";

import dashboardRoutes from "./views/dashboard/DashboardRoutes";
import profileRoutes from "./views/Profile/ProfileRoutes";
import setifikatRoute from "./views/Manajemen/Sertifikat/SertifikatRoutes";
import SlidersRoutes from "./views/Sliders/SlidersRoutes";
import PaymentRoutes from "./views/Payment/PaymentRoutes";
import SettingsRoutes from "./views/Settings/SettingsRoutes";
import transactionRoutes from "./views/transaction/TransactionRoutes";

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
  ...SlidersRoutes,
  ...PaymentRoutes,
  ...SettingsRoutes,
  ...setifikatRoute,
  ...profileRoutes,
  ...transactionRoutes,
  ...redirectRoute,
  ...errorRoute,
];

export default routes;
