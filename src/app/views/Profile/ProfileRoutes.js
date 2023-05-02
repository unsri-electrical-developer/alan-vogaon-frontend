import { authRoles } from '../../auth/authRoles';
import EditProfile from './EditProfile';
import Profile from './Profile';

const profileRoutes = [
    {
        path: '/profile/edit',
        component: EditProfile,
        auth: authRoles.all
    },
    {
        path: '/profile',
        component: Profile,
        auth: authRoles.all
    }
];

export default profileRoutes;
