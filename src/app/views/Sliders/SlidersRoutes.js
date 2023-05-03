import { authRoles } from '../../auth/authRoles';
import Sliders from './Sliders';

const SlidersRoutes = [
  {
    path: '/sliders',
    component: Sliders,
    auth: authRoles.all,
  },
];

export default SlidersRoutes;
