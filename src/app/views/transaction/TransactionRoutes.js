import { authRoles } from "../../auth/authRoles";
import Transaction from "./Transaction";

const transactionRoutes = [
  {
    path: "/transaction",
    component: Transaction,
    auth: authRoles.all,
  },
];

export default transactionRoutes;
