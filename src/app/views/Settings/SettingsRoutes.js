import { authRoles } from '../../auth/authRoles';
import Faq from './FAQ/Faq';
import GeneralInfo from './GeneralInfo/GeneralInfo';
import PrivacyPolicy from './PrivacyPolicy/PrivacyPolicy';
import SnK from './SnK/SnK';

const SettingsRoutes = [
  {
    path: '/settings/faq',
    component: Faq,
    auth: authRoles.all,
    exact: true,
  },
  {
    path: '/settings/general_info',
    component: GeneralInfo,
    auth: authRoles.all,
    exact: true,
  },
  {
    path: '/settings/snk',
    component: SnK,
    auth: authRoles.all,
    exact: true,
  },
  {
    path: '/settings/privacy_policy',
    component: PrivacyPolicy,
    auth: authRoles.all,
    exact: true,
  },
];

export default SettingsRoutes;
