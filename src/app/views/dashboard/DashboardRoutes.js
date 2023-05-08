import { authRoles } from '../../auth/authRoles';
import Dashboard from './Dashboard';
import Users from './Users';
import DetailUser from "./DetailUser";
import GamesCategory from './GamesCategory';
import GamesListGames from "./GamesListGames";
import AddGamesCategory from './AddGamesCategory';
import AddGamesListGames from "./AddGamesListGames";
import EditGamesCategory from "./EditGamesCategory";
import DetailListGames from "./DetailListGames";

const dashboardRoutes = [
  {
    path: "/dashboard",
    component: Dashboard,
    auth: authRoles.all,
    exact: true,
  },

  {
    path: "/users",
    component: Users,
    auth: authRoles.all,
    exact: true,
  },
  {
    path: "/users/:id",
    component: DetailUser,
    auth: authRoles.all,
    exact: true,
  },
  {
    path: "/games/category",
    component: GamesCategory,
    auth: authRoles.all,
    exact: true,
  },
  {
    path: "/games/category/add",
    component: AddGamesCategory,
    auth: authRoles.all,
    exact: true,
  },
  {
    path: "/games/category/edit/:id",
    component: EditGamesCategory,
    auth: authRoles.all,
    exact: true,
  },
  {
    path: "/games/listGames",
    component: GamesListGames,
    auth: authRoles.all,
    exact: true,
  },
  {
    path: "/games/listGames/add",
    component: AddGamesListGames,
    auth: authRoles.all,
    exact: true,
  },
  {
    path: "/games/listGames/detail",
    component: DetailListGames,
    auth: authRoles.all,
    exact: true,
  },
];

export default dashboardRoutes;
