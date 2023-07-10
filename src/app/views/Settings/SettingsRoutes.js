import { authRoles } from '../../auth/authRoles';
import Faq from './FAQ/Faq';
import GeneralInfo from './GeneralInfo/GeneralInfo';
import PrivacyPolicy from './PrivacyPolicy/PrivacyPolicy';
import SnK from './SnK/SnK';

const SettingsRoutes = [
  {
    path: '/settings/faq',
    component: Faq,
    auth: authRoles.adm,
    exact: true,
  },
  {
    path: '/settings/general_info',
    component: GeneralInfo,
    auth: authRoles.adm,
    exact: true,
  },
  {
    path: '/settings/snk',
    component: SnK,
    auth: authRoles.adm,
    exact: true,
  },
  {
    path: '/settings/privacy_policy',
    component: PrivacyPolicy,
    auth: authRoles.adm,
    exact: true,
  },
];

export default SettingsRoutes;
