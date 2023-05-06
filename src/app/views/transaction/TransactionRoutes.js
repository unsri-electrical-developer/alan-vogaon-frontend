import { authRoles } from "../../auth/authRoles";
import Transaction from "./Transaction";
import DetailPembelian from "./DetailPembelian";
import DetailTopUp from "./DetailTopUp";
const transactionRoutes = [
  {
    path: "/transaction",
    component: Transaction,
    auth: authRoles.all,
    exact: true,
  },
  {
    path: "/transaction/payment/detail/:id",
    component: DetailPembelian,
    exact: false,

    auth: authRoles.all,
  },
  {
    path: "/transaction/topup/detail/:id",
    component: DetailTopUp,
    exact: false,

    auth: authRoles.all,
  },
];

export default transactionRoutes;
