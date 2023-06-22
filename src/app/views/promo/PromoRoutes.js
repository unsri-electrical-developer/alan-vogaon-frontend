import { authRoles } from "../../auth/authRoles";
import AddPromo from "./AddPromo";
import EditPromo from "./EditPromo";
import KodePromo from "./KodePromo";

const PromoRoutes = [
  {
    path: "/kode_promo",
    component: KodePromo,
    auth: authRoles.all,
    exact: true,
  },
  {
    path: "/kode_promo/add",
    component: AddPromo,
    auth: authRoles.all,
    exact: true,
  },
  {
    path: "/kode_promo/edit/:id",
    component: EditPromo,
    auth: authRoles.all,
    exact: true,
  },
];

export default PromoRoutes;
