import { API, setAuthToken } from "../../../../config/API.js";
import {
  GET_RIWAYAT_PEMBELIAN,
  GET_TOTAL_PEMBELIAN,
  GET_DETAIL_PEMBELIAN,
  GET_RIWAYAT_TOPUP,
  GET_TOTAL_TOPUP,
  GET_DETAIL_TOPUP,
} from "../../constant.js";

export const getRiwayatPembelian = (params) => {
  return (dispatch) => {
    const token = localStorage.getItem("jwt_token");
    setAuthToken(token);
    API.get(`/transaction/riwayat_pembelian` + params)
      .then((res) => {
        dispatch({
          type: GET_RIWAYAT_PEMBELIAN,
          payload: res.data.data || [],
        });
      })
      .catch(() => {
        dispatch({
          type: GET_RIWAYAT_PEMBELIAN,
          payload: [],
        });
      });
  };
};

export const getRiwayatTopUp = (params) => {
  return (dispatch) => {
    const token = localStorage.getItem("jwt_token");
    setAuthToken(token);
    API.get(`/transaction/riwayat_topupsaldo` + params)
      .then((res) => {
        dispatch({
          type: GET_RIWAYAT_TOPUP,
          payload: res.data.data || [],
        });
      })
      .catch(() => {
        dispatch({
          type: GET_RIWAYAT_TOPUP,
          payload: [],
        });
      });
  };
};

export const getDetailTopUp = (params) => {
  return (dispatch) => {
    const token = localStorage.getItem("jwt_token");
    setAuthToken(token);
    API.get(`/transaction/detail_topupsaldo/` + params)
      .then((res) => {
        dispatch({
          type: GET_DETAIL_TOPUP,
          payload: res.data.data || [],
        });
      })
      .catch(() => {
        dispatch({
          type: GET_DETAIL_TOPUP,
          payload: [],
        });
      });
  };
};

export const getDetailPembelian = (params) => {
  return (dispatch) => {
    const token = localStorage.getItem("jwt_token");
    setAuthToken(token);
    API.get(`/transaction/detail_pembelian/` + params)
      .then((res) => {
        dispatch({
          type: GET_DETAIL_PEMBELIAN,
          payload: res.data.data || [],
        });
      })
      .catch(() => {
        dispatch({
          type: GET_DETAIL_PEMBELIAN,
          payload: [],
        });
      });
  };
};
export const getTotalPembelian = () => {
  return (dispatch) => {
    const token = localStorage.getItem("jwt_token");
    setAuthToken(token);
    API.get(`/transaction/riwayat_pembelian/total`)
      .then((res) => {
        dispatch({
          type: GET_TOTAL_PEMBELIAN,
          payload: res.data.data || [],
        });
      })
      .catch(() => {
        dispatch({
          type: GET_TOTAL_PEMBELIAN,
          payload: [],
        });
      });
  };
};
export const getTotalTopUp = () => {
  return (dispatch) => {
    const token = localStorage.getItem("jwt_token");
    setAuthToken(token);
    API.get(`/transaction/total_topupsaldo`)
      .then((res) => {
        dispatch({
          type: GET_TOTAL_TOPUP,
          payload: res.data.data || [],
        });
      })
      .catch(() => {
        dispatch({
          type: GET_TOTAL_TOPUP,
          payload: [],
        });
      });
  };
};
