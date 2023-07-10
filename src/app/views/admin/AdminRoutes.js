import { authRoles } from "../../auth/authRoles";
import AddAdmin from "./AddAdmin";
import EditAdmin from "./EditAdmin";
import Admin from "./Admin";

const AdminRoutes = [
  {
    path: "/admin",
    component: Admin,
    auth: authRoles.adm,
    exact: true,
  },
  {
    path: "/admin/add",
    component: AddAdmin,
    auth: authRoles.adm,
    exact: true,
  },
  {
    path: "/admin/edit/:id",
    component: EditAdmin,
    auth: authRoles.adm,
    exact: true,
  },
];

export default AdminRoutes;
