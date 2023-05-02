import { API, setAuthToken } from '../../../config/API.js';
import { DASHBOARD_DATA, LOADING_DASHBOARD } from '../constant.js';

export const getProvinsi = () => {
  return API.get("admin/province");
};

export const getDashboardData = () => {
  return (dispatch) => {
    dispatch({
      type: LOADING_DASHBOARD,
      payload: true,
    });
    const token = localStorage.getItem("jwt_token");
    setAuthToken(token);
    API.get(`admin/dashboard`)
      .then((res) => {
        dispatch({
          type: DASHBOARD_DATA,
          payload: res.data.data,
        });
      })
      .catch(() => {
        dispatch({
          type: DASHBOARD_DATA,
          payload: [],
        });
      });
  };
};

export const getChatDashboard = (jenis) => {
  return (dispatch) => {
    dispatch({
      type: "SET_LOADING_" + jenis,
      payload: true,
    });
    const token = localStorage.getItem("jwt_token");
    setAuthToken(token);
    API.get(`admin/dashboard/${jenis.toLowerCase()}`)
      .then((res) => {
        dispatch({
          type: "GET_CHART_" + jenis,
          payload: res.data.data,
        });
      })
      .catch(() => {
        dispatch({
          type: "GET_CHART_" + jenis,
          payload: null,
        });
      });
  };
};

export const getPaket = () => {
  const token = localStorage.getItem("jwt_token");
  setAuthToken(token);
  return API.get("admin/subscription");
};

export const getJudulSection = () => {
  const token = localStorage.getItem("jwt_token");
  setAuthToken(token);
  return API.get("admin/admin_settings");
};

export const updPrivacy = (params) => {
  const token = localStorage.getItem("jwt_token");
  setAuthToken(token);
  return API.post("admin/privasi/edit", params);
};

export const updBanner = (params) => {
  const token = localStorage.getItem("jwt_token");
  setAuthToken(token);
  return API.post("admin/banner/edit", params);
};

export const updTentang = (params) => {
  const token = localStorage.getItem("jwt_token");
  setAuthToken(token);
  return API.post("admin/tentang/edit", params);
};

export const getKontak = () => {
  const token = localStorage.getItem("jwt_token");
  setAuthToken(token);
  return API.get("admin/kontak");
};

export const updKontak = (params) => {
  const token = localStorage.getItem("jwt_token");
  setAuthToken(token);
  return API.post("admin/kontak/edit", params);
};

export const updJudulSection = (params) => {
  const token = localStorage.getItem("jwt_token");
  setAuthToken(token);
  return API.post("admin/judul_section/edit", params);
};

export const updateStatusDesa = (params) => {
  const token = localStorage.getItem("jwt_token");
  setAuthToken(token);
  return API.post("admin/sch/confirm", params);
};

export const getWebVersion = () => {
  const token = localStorage.getItem("jwt_token");
  setAuthToken(token);
  return API.get("admin/version");
};

export const updWebVersion = (params) => {
  const token = localStorage.getItem("jwt_token");
  setAuthToken(token);
  return API.post("admin/version/edit", params);
};

export const updTerm = (params) => {
  const token = localStorage.getItem("jwt_token");
  setAuthToken(token);
  return API.post("admin/ptc/edit", params);
};
