import { API, setAuthToken } from "../../../config/API.js";
import history from "../../../history.js";
import apiAuthService from "../../services/apiAuthService";

// CATEGORY
export const GET_ALL_CATEGORIES = "GET_ALL_CATEGORIES";
export const DELETE_CATEGORY = "DELETE_CATEGORY";
export const GET_DETAIL_CATEGORY = "GET_DETAIL_CATEGORY";
export const GET_GAMES_VOUCHER = "GET_GAMES_VOUCHER";
export const GET_ALL_GAMES_VOUCHER = "GET_ALL_GAMES_VOUCHER";

// CATEGORY
export const getAllCategories = () => {
  const token = localStorage.getItem("jwt_token");
  setAuthToken(token);
  return API.get("/category/");
};

export const getAllGamesVoucher = () => {
  const token = localStorage.getItem("jwt_token");
  setAuthToken(token);
  return API.get("/game_voucher");
};

export const getGameItems = (id) => {
  const token = localStorage.getItem("jwt_token");
  setAuthToken(token);
  return API.get(`/games_item/${id}/products`);
};

export const getDetailCategory = (id) => {
  const token = localStorage.getItem("jwt_token");
  setAuthToken(token);
  return API.get("/category/" + id);
};

export const addCategory = (params) => {
  return async (dispatch) => {
    const token = await localStorage.getItem("jwt_token");
    setAuthToken(token);
    API.defaults.headers.common["Content-Type"] = "multipart/form-data";
    const res = await API.post("/category", params).catch((err) => {
      return Promise.reject(err);
    });

    return res.data;
  };
};

export const editCategory = (data) => {
  return async (dispatch) => {
    const token = await localStorage.getItem("jwt_token");
    setAuthToken(token);
    API.defaults.headers.common["Content-Type"] = "multipart/form-data";
    const res = await API.patch("/category/" + data.category_code, {
      category_name: data.category_name,
    }).catch((err) => {
      return Promise.reject(err);
    });
    return res.data;
  };
};

export const getGamesVoucher = (params) => {
  return (dispatch) => {
    const token = localStorage.getItem("jwt_token");
    setAuthToken(token);
    API.get(`/game_voucher/` + params)
      .then((res) => {
        dispatch({
          type: GET_GAMES_VOUCHER,
          payload: res.data.data || [],
        });
      })
      .catch(() => {
        dispatch({
          type: GET_GAMES_VOUCHER,
          payload: [],
        });
      });
  };
};

// export const getAllGamesVoucher = (params) => {
//   return (dispatch) => {
//     const token = localStorage.getItem("jwt_token");
//     setAuthToken(token);
//     API.get(`/game_voucher` + params)
//       .then((res) => {
//         dispatch({
//           type: GET_ALL_GAMES_VOUCHER,
//           payload: res.data.data || [],
//         });
//       })
//       .catch(() => {
//         dispatch({
//           type: GET_ALL_GAMES_VOUCHER,
//           payload: [],
//         });
//       });
//   };
// };

export const addGamesVoucher = (params, id) => {
  return async (dispatch) => {
    const token = await localStorage.getItem("jwt_token");
    setAuthToken(token);
    API.defaults.headers.common["Content-Type"] = "multipart/form-data";
    const res = await API.post(`/game_voucher/${id}`, params).catch((err) => {
      return Promise.reject(err);
    });

    return res.data;
  };
};

export const editGamesVoucher = (params, id) => {
  return async (dispatch) => {
    const token = await localStorage.getItem("jwt_token");
    setAuthToken(token);
    API.defaults.headers.common["Content-Type"] = "multipart/form-data";
    const res = await API.patch(`/game_voucher/${id}`, params).catch((err) => {
      return Promise.reject(err);
    });

    return res.data;
  };
};

export const delCategory = (id) => {
  const token = localStorage.getItem("jwt_token");
  setAuthToken(token);
  return API.delete("/category/" + id);
};

// GAMES LIST
export const getAllGamesList = (params) => {
  const token = localStorage.getItem("jwt_token");
  setAuthToken(token);
  return API.get(`/games${params}`);
};

export const getDetailGamesList = (id) => {
  const token = localStorage.getItem("jwt_token");
  setAuthToken(token);
  return API.get("/games/" + id);
};

export const addGamesList = (params) => {
  const token = localStorage.getItem("jwt_token");
  setAuthToken(token);
  API.defaults.headers.common["Content-Type"] = "multipart/form-data";
  return API.post("/games", params);
};

export const editGamesList = (params) => {
  const token = localStorage.getItem("jwt_token");
  setAuthToken(token);
  API.defaults.headers.common["Content-Type"] = "multipart/form-data";
  return API.patch("/games/" + params.id, params);
};

export const delGamesList = (id) => {
  const token = localStorage.getItem("jwt_token");
  setAuthToken(token);
  return API.delete("/games/" + id);
};
