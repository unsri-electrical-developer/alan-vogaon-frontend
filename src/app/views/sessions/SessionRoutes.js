import NotFound from './NotFound';
import SignIn from './SignIn';

const sessionRoutes = [
    {
        path: '/login',
        component: SignIn
    },
    {
        path: '/session/404',
        component: NotFound
    }
];

export default sessionRoutes;
