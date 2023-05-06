import { authRoles } from '../../auth/authRoles';
import Faq from './FAQ/Faq';
import GeneralInfo from './GeneralInfo/GeneralInfo';

const SettingsRoutes = [
  {
    path: '/faq',
    component: Faq,
    auth: authRoles.all,
    exact: true,
  },
  {
    path: '/general_info',
    component: GeneralInfo,
    auth: authRoles.all,
    exact: true,
  },
];

export default SettingsRoutes;
