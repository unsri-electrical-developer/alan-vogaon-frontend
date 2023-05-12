import { API, setAuthToken } from "../../../../config/API.js";
import {
  GET_DASHBOARD,
  GET_GRAFIK_PENDAFTARAN,
  GET_GRAFIK_PENDAPATAN,
  GET_GRAFIK_PENJUALAN,
} from "../../constant.js";

export const getGrafikPendaftaran = (params) => {
  return (dispatch) => {
    const token = localStorage.getItem("jwt_token");
    setAuthToken(token);
    API.get(`/dashboard/statistik_pendaftaran` + params)
      .then((res) => {
        dispatch({
          type: GET_GRAFIK_PENDAFTARAN,
          payload: res.data.data || [],
        });
      })
      .catch(() => {
        dispatch({
          type: GET_GRAFIK_PENDAFTARAN,
          payload: [],
        });
      });
  };
};

export const getGrafikPendapatan = (params) => {
  return (dispatch) => {
    const token = localStorage.getItem("jwt_token");
    setAuthToken(token);
    API.get(`/dashboard/statistik_pendapatan` + params)
      .then((res) => {
        dispatch({
          type: GET_GRAFIK_PENDAPATAN,
          payload: res.data.data || [],
        });
      })
      .catch(() => {
        dispatch({
          type: GET_GRAFIK_PENDAPATAN,
          payload: [],
        });
      });
  };
};

export const getGrafikPenjualan = (params) => {
  return (dispatch) => {
    const token = localStorage.getItem("jwt_token");
    setAuthToken(token);
    API.get(`/dashboard/statistik_penjualan_game` + params)
      .then((res) => {
        dispatch({
          type: GET_GRAFIK_PENJUALAN,
          payload: res.data.data || [],
        });
      })
      .catch(() => {
        dispatch({
          type: GET_GRAFIK_PENJUALAN,
          payload: [],
        });
      });
  };
};

export const getDashboard = () => {
  return (dispatch) => {
    const token = localStorage.getItem("jwt_token");
    setAuthToken(token);
    API.get(`/dashboard/data_dashboard`)
      .then((res) => {
        dispatch({
          type: GET_DASHBOARD,
          payload: res.data.data || [],
        });
      })
      .catch(() => {
        dispatch({
          type: GET_DASHBOARD,
          payload: [],
        });
      });
  };
};
