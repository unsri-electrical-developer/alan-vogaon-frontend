import { API, setAuthToken } from "../../../../config/API.js";
import { GET_RIWAYAT_PEMBELIAN, GET_TOTAL_PEMBELIAN } from "../../constant.js";

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
