import { API, setAuthToken } from '../../../config/API.js';
import { GET_SERTIFIKAT, SET_LOADING_SERTIFIKAT, SET_PAGINATION_SERTIFIKAT } from '../constant.js';

export const getSertifikat = (params) => {
  return (dispatch) => {
    const token = localStorage.getItem("jwt_token");
    setAuthToken(token);
    dispatch({
      type: SET_LOADING_SERTIFIKAT,
      payload: true,
    });
    API.get(`admin/about/certificate?${new URLSearchParams(params).toString()}`)
      .then((res) => {
        dispatch({
          type: GET_SERTIFIKAT,
          payload: res.data.data || [],
        }); 
        dispatch({
          type: SET_PAGINATION_SERTIFIKAT,
          payload: res?.data?.data?.last_page,
        });
      })
      .catch(() => {
        dispatch({
          type: GET_SERTIFIKAT,
          payload: [],
        });
        dispatch({
          type: SET_PAGINATION_SERTIFIKAT,
          payload: 0,
        });
      });
  };
};

export const addSertifikat = (params) => {
  const token = localStorage.getItem("jwt_token");
  setAuthToken(token);
  return API.post("admin/about/certificate/add", params);
};

export const getDetailSertifikat = (id) => {
  const token = localStorage.getItem("jwt_token");
  setAuthToken(token);
  return API.get("admin/about/certificate/" + id);
};

export const updSertifikat = (params) => {
  const token = localStorage.getItem("jwt_token");
  setAuthToken(token);
  return API.post("admin/about/certificate/edit", params);
};

export const delSertifikat = (code) => {
  const token = localStorage.getItem("jwt_token");
  setAuthToken(token);
  return API.delete("admin/about/certificate/delete/" + code);
};
