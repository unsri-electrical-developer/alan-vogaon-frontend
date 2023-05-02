import { API, setAuthToken } from '../../../config/API.js';
import { GET_ADMIN, SET_LOADING_ADMIN, SET_PAGINATION_ADMIN } from '../constant.js';

export const getAdmin = (params) => {
  return (dispatch) => {
    const token = localStorage.getItem("jwt_token");
    setAuthToken(token);
    dispatch({
      type: SET_LOADING_ADMIN,
      payload: true,
    });
    API.get(`admin?${new URLSearchParams(params).toString()}`)
      .then((res) => {
        dispatch({
          type: GET_ADMIN,
          payload: res.data.data || [],
        });
        dispatch({
          type: SET_PAGINATION_ADMIN,
          payload: res?.data?.data?.last_page,
        });
      })
      .catch(() => {
        dispatch({
          type: GET_ADMIN,
          payload: [],
        });
        dispatch({
          type: SET_PAGINATION_ADMIN,
          payload: 0,
        });
      });
  };
};

export const addAdmin = (params) => {
  const token = localStorage.getItem("jwt_token");
  setAuthToken(token);
  return API.post("admin/add", params);
};

export const getDetailAdmin = (id) => {
  const token = localStorage.getItem("jwt_token");
  setAuthToken(token);
  return API.get("admin/" + id);
};

export const updAdmin = (params) => {
  const token = localStorage.getItem("jwt_token");
  setAuthToken(token);
  return API.post("admin/edit", params);
};

export const delAdmin = (code) => {
  const token = localStorage.getItem("jwt_token");
  setAuthToken(token);
  return API.delete("admin/delete/" + code);
};

export const updAdmin2 = (params) => {
  const token = localStorage.getItem("jwt_token");
  setAuthToken(token);
  return API.post("admin/profile/edit", params);
};
