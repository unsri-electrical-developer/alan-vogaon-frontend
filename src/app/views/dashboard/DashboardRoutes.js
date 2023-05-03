import { authRoles } from '../../auth/authRoles';
import Dashboard from './Dashboard';
import Users from './Users';
import GamesCategory from './GamesCategory';

const dashboardRoutes = [
  {
    path: "/dashboard",
    component: Dashboard,
    auth: authRoles.all,
  },

  {
    path: "/users",
    component: Users,
    auth: authRoles.all,
  },

  {
    path: "/games_category",
    component: GamesCategory,
    auth: authRoles.all,
  },
];

export default dashboardRoutes;
