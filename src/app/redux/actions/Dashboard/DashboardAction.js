import { API, setAuthToken } from "../../../../config/API.js";
import { GET_RIWAYAT_PEMBELIAN, GET_DASHBOARD } from "../../constant.js";

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
