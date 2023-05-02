/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect } from "react";
import { useDispatch } from "react-redux";

import { setAuthLoadingStatus } from "../redux/actions/LoginActions";
import { getNavigationByUser } from "../redux/actions/NavigationAction";
import { setUserData } from "../redux/actions/UserActions";
import apiAuthService from "../services/apiAuthService";

const checkJwtAuth = async (dispatch, setUserData) => {
  const token = await localStorage.getItem("jwt_token");
  return apiAuthService
    .loginWithToken(token)
    .then((user) => {
      dispatch(setUserData(user));
    })
    .catch(() => {
      dispatch(setUserData(null));
    });
};

const Auth = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setAuthLoadingStatus(true));
    checkJwtAuth(dispatch, setUserData)
      .then(() => {
        dispatch(getNavigationByUser());
      })
      .finally(() => dispatch(setAuthLoadingStatus(false)));
  }, [setUserData, getNavigationByUser]);

  return <Fragment>{children}</Fragment>;
};

export default Auth;
