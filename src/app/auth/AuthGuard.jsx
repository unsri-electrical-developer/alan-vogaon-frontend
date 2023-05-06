import React, { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, useLocation } from 'react-router-dom';

import { MatxLoading } from '../../matx';
import AppContext from '../appContext';

const getAuthStatus = (pathname, user, routes) => {
  const matched = routes.find((r) => r.path === pathname);
  const authenticated =
    matched && matched.auth && matched.auth.length
      ? matched.auth.includes(user.users_type)
      : Object.keys(user).length;

  return authenticated;
};

const AuthGuard = ({ component: Component, isPrivate = true, ...rest }) => {
  const [previouseRoute, setPreviousRoute] = useState(null);

  const { routes } = useContext(AppContext);
  const { pathname } = useLocation();
  const {
    user,
    login: { loading },
  } = useSelector((state) => state);

  let authenticated = getAuthStatus(pathname, user, routes);

  useEffect(() => {
    setPreviousRoute(pathname);
  }, [pathname]);

  let path = pathname.split('/', 3);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (loading) return <MatxLoading />;
        else if (pathname === '/') return <Redirect to="/dashboard" />;
        else if (authenticated && path[1] === 'login')
          return <Redirect to="/dashboard" />;
        else if (authenticated || !isPrivate) return <Component {...props} />;
        else if (user && isPrivate && authenticated)
          return <Redirect to="/session/404" />;
        else
          return (
            <Redirect
              to={{
                pathname: '/login',
                state: { redirectUrl: previouseRoute },
              }}
            />
          );
      }}
    />
  );
};

export default AuthGuard;
