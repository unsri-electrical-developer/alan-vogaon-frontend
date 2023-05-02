import { authRoles } from '../../auth/authRoles';
import Dashboard from './Dashboard';

const dashboardRoutes = [
  {
    path: "/dashboard",
    component: Dashboard,
    auth: authRoles.all,
  },
];

export default dashboardRoutes;
