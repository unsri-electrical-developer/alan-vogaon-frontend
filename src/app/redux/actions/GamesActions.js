import { API, setAuthToken } from "../../../config/API.js";
import history from "../../../history.js";
import apiAuthService from "../../services/apiAuthService";

// CATEGORY
export const GET_ALL_CATEGORIES = "GET_ALL_CATEGORIES";
export const DELETE_CATEGORY = "DELETE_CATEGORY";
export const GET_DETAIL_CATEGORY = "GET_DETAIL_CATEGORY";

// CATEGORY
export const getAllCategories = () => {
  const token = localStorage.getItem("jwt_token");
  setAuthToken(token);
  return API.get("/category/");
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

export const addGamesList = async (params) => {
  const token = await localStorage.getItem("jwt_token");
  setAuthToken(token);
  API.defaults.headers.common["Content-Type"] = "multipart/form-data";
  return API.post("/games", params);
};

export const editGamesList = async (params) => {
  const token = await localStorage.getItem("jwt_token");
  setAuthToken(token);
  API.defaults.headers.common["Content-Type"] = "multipart/form-data";
  return API.patch("/games/" + params.id, params);
};

export const delGamesList = (id) => {
  const token = localStorage.getItem("jwt_token");
  setAuthToken(token);
  return API.delete("/games/" + id);
};
