import { authRoles } from "../../auth/authRoles";
import PaymentGateway from "./PaymentGateway";

const GamesRoutes = [
  {
    path: "/games/kode-promo",
    component: PaymentGateway,
    auth: authRoles.all,
    exact: true,
  },
];

export default GamesRoutes;
