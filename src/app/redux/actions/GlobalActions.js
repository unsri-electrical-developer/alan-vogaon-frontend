import { API, setAuthToken } from "../../../config/API.js";

export const getGlobalData = () => {
  const token = localStorage.getItem("jwt_token");
  setAuthToken(token);
  return API.get(`admin/global_setting`);
};

export const updInfoUmum = (params) => {
  const token = localStorage.getItem("jwt_token");
  setAuthToken(token);
  return API.post("admin/general_info/edit", params);
};

export const updBGContact = (params) => {
  const token = localStorage.getItem("jwt_token");
  setAuthToken(token);
  return API.post("admin/contact/bg/edit", params);
};

export const updCareerEmail = (params) => {
  const token = localStorage.getItem("jwt_token");
  setAuthToken(token);
  return API.post("admin/career/email/edit", params);
};

export const updOrgStucture = (params) => {
  const token = localStorage.getItem("jwt_token");
  setAuthToken(token);
  return API.post("admin/org_structure/edit", params);
};

export const updGCGContent = (params) => {
  const token = localStorage.getItem("jwt_token");
  setAuthToken(token);
  return API.post("admin/gcg/content/edit", params);
};
