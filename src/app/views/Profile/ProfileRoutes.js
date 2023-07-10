import { authRoles } from '../../auth/authRoles';
// import EditProfile from './EditProfile';
import FA from './FA';
import Profile from './Profile';

const profileRoutes = [
    // {
    //     path: '/profile/edit',
    //     component: EditProfile,
    //     auth: authRoles.all
    // },
    {
        path: '/profile/2fa',
        component: FA,
        auth: authRoles.all
    },
    {
        path: '/profile',
        component: Profile,
        auth: authRoles.all
    }
];

export default profileRoutes;
