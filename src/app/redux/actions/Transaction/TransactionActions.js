import { API, setAuthToken } from "../../../../config/API.js";
import {
  GET_RIWAYAT_PEMBELIAN,
  GET_TOTAL_PEMBELIAN,
  GET_DETAIL_PEMBELIAN,
  GET_RIWAYAT_TOPUP,
  GET_TOTAL_TOPUP,
  GET_DETAIL_TOPUP,
  GET_USERS_TOPUP,
  GET_DETAIL_USER_TOPUP,
  SET_USER_SALDO,
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

export const getDetailTotalPembelian = (params) => {
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

export const updateStatusPembelian = (body) => {
  const token = localStorage.getItem('jwt_token');
  setAuthToken(token);
  return API.patch('/transaction/edit_status', body);
};

export const getUsersTopUp = (params) => {
  return (dispatch) => {
    const token = localStorage.getItem("jwt_token");
    setAuthToken(token);
    API.get(`/transaction/users_topup` + params)
      .then((res) => {
        dispatch({
          type: GET_USERS_TOPUP,
          payload: res.data.data || [],
        });
      })
      .catch(() => {
        dispatch({
          type: GET_USERS_TOPUP,
          payload: [],
        });
      });
  };
};

export const getDetailUserTopup = (params) => {
  return (dispatch) => {
    const token = localStorage.getItem("jwt_token");
    setAuthToken(token);
    API.get(`/transaction/detail_user_topup/` + params)
      .then((res) => {
          dispatch({
            type: GET_DETAIL_USER_TOPUP,
            payload: res.data.data || [],
          });
      })
      .catch(() => {
        dispatch({
          type: GET_DETAIL_USER_TOPUP,
          payload: [],
        });
      });
  };
};

export const updateUserSaldo = (body) => {
  const token = localStorage.getItem('jwt_token');
  setAuthToken(token);
  return API.patch('/transaction/ganti_saldo', body);
  // params : pm_code
  /*
    - body :
    -pm_title : Apple Pay
    -pm_logo : base64
    -from : dana : payment gateway code
    -pm_code : apple-pay
  */
};
