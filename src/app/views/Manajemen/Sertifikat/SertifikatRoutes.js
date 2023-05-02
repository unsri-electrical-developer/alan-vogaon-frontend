import { authRoles } from "../../../auth/authRoles";
import DetailSertifikat from "./DetailSertifikat";
import EditSertifikat from "./EditSertifikat";
import Sertifikat from "./Sertifikat";
import TambahSertifikat from "./TambahSertifikat";

const setifikatRoute = [
  {
    path: "/sertifikat_penghargaan/detail/:id",
    exact: true,
    component: DetailSertifikat,
    auth: authRoles.all,
  },
  {
    path: "/sertifikat_penghargaan/edit/:id",
    exact: true,
    component: EditSertifikat,
    auth: authRoles.all,
  },
  {
    path: "/sertifikat_penghargaan/tambah",
    exact: true,
    component: TambahSertifikat,
    auth: authRoles.all,
  },
  {
    path: "/sertifikat_penghargaan",
    exact: true,
    component: Sertifikat,
    auth: authRoles.all,
  },
];

export default setifikatRoute;
