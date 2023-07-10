import NotFound from './NotFound';
import SignIn from './SignIn';
import CheckFA from './CheckFA';

const sessionRoutes = [
    {
        path: '/login',
        component: SignIn
    },
    {
        path: '/session/404',
        component: NotFound
    },
    {
        path: '/checkFA',
        component: CheckFA
    },
];

export default sessionRoutes;
