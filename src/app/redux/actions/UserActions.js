import { API, setAuthToken } from '../../../config/API.js';
import history from '../../../history.js';
import apiAuthService from '../../services/apiAuthService';

export const SET_USER_DATA = 'USER_SET_DATA';
export const REMOVE_USER_DATA = 'USER_REMOVE_DATA';
export const USER_LOGGED_OUT = 'USER_LOGGED_OUT';
export const GET_ALL_USERS = 'GET_ALL_USERS';
export const GET_DETAIL_USER = 'GET_DETAIL_USER';


export function setUserData(user) {
  return (dispatch) => {
    dispatch({
      type: SET_USER_DATA,
      data: user,
    });
  };
}

export function logoutUser(token) {
  return (dispatch) => {
    let logout = apiAuthService.logout(token);
    if (logout) {
      dispatch({
        type: USER_LOGGED_OUT,
      });
      history.push('/login');
    }
  };
}

export const getProfile = async () => {
  const token = localStorage.getItem('jwt_token');
  setAuthToken(token);
  return await API.get('admin/profile');
};

export const getNoteReject = async () => {
  const token = localStorage.getItem('jwt_token');
  setAuthToken(token);
  return await API.get('user/reject/note');
};

export const getDataDesaProfile = async () => {
  const token = localStorage.getItem('jwt_token');
  setAuthToken(token);
  return await API.get('user/desa');
};

export const updDataDesaProfile = async (params) => {
  const token = localStorage.getItem('jwt_token');
  setAuthToken(token);
  return await API.post('user/resubmit', params);
};

export const resendConfirmEmail = async () => {
  const token = localStorage.getItem('jwt_token');
  setAuthToken(token);
  return await API.post('user/resend/verification_email');
};

export const updProfile = async (params) => {
  const token = localStorage.getItem('jwt_token');
  setAuthToken(token);
  return await API.post('user/profile/edit', params);
};

export const getAllUsers = (params) => {
  const token = localStorage.getItem('jwt_token');
  setAuthToken(token);
  return API.get('/users/' + params);
};

export const getDetailUser = (id) => {
  const token = localStorage.getItem('jwt_token');
  setAuthToken(token);
  return API.get('/users/' + id);
};