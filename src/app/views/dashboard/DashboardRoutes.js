import { authRoles } from "../../auth/authRoles";
import Dashboard from "./Dashboard";
import Users from "./Users";
import DetailUser from "./DetailUser";
import GamesCategory from "./GamesCategory";
import GamesListGames from "./GamesListGames";
import AddGamesCategory from "./AddGamesCategory";
import AddGamesListGames from "./AddGamesListGames";
import EditGamesCategory from "./EditGamesCategory";
import DetailListGames from "./DetailListGames";
import EditListGames from "./EditListGames";
import RedeemListCode from "./RedeemListCode";
import GamesVoucher from "./GamesVoucher";
import AddGamesVoucher from "./AddGamesVoucher";

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
    path: "/games/redeem-list-code/:id",
    component: RedeemListCode,
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
    path: "/games/voucher",
    component: GamesVoucher,
    auth: authRoles.all,
    exact: true,
  },
  {
    path: "/games/voucher/add",
    component: AddGamesVoucher,
    auth: authRoles.all,
    exact: true,
  },
  // {
  //   path: "/games/voucher/edit/:id",
  //   component: EditGamesVoucher,
  //   auth: authRoles.all,
  //   exact: true,
  // },
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
    path: "/games/listGames/detail/:id",
    component: DetailListGames,
    auth: authRoles.all,
    exact: true,
  },
  {
    path: "/games/listGames/edit/:id",
    component: EditListGames,
    auth: authRoles.all,
    exact: true,
  },
];

export default dashboardRoutes;
