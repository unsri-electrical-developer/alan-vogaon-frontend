import { API, setAuthToken } from '../../../config/API.js';
import { GET_PROMO, SET_LOADING_PROMO, SET_PAGINATION_PROMO } from '../constant.js';

export const getPromo = (params) => {
  return (dispatch) => {
    const token = localStorage.getItem("jwt_token");
    setAuthToken(token);
    dispatch({
      type: SET_LOADING_PROMO,
      payload: true,
    });
    API.get(`promo?${new URLSearchParams(params).toString()}`)
      .then((res) => {
        dispatch({
          type: GET_PROMO,
          payload: res.data.data || [],
        });
        dispatch({
          type: SET_PAGINATION_PROMO,
          payload: res?.data?.data?.last_page,
        });
      })
      .catch(() => {
        dispatch({
          type: GET_PROMO,
          payload: [],
        });
        dispatch({
          type: SET_PAGINATION_PROMO,
          payload: 0,
        });
      });
  };
};

export const addPromo = (params) => {
  const token = localStorage.getItem("jwt_token");
  setAuthToken(token);
  return API.post("promo/add", params);
};

export const getDetailPromo = (id) => {
  const token = localStorage.getItem("jwt_token");
  setAuthToken(token);
  return API.get("promo/" + id);
};

export const updPromo = (params) => {
  const token = localStorage.getItem("jwt_token");
  setAuthToken(token);
  return API.post("promo/edit", params);
};

export const delPromo = (code) => {
  const token = localStorage.getItem("jwt_token");
  setAuthToken(token);
  return API.delete("promo/delete/" + code);
};

export const updStatusPromo = (params) => {
  const token = localStorage.getItem("jwt_token");
  setAuthToken(token);
  return API.post("promo/edit/status", params);
};
