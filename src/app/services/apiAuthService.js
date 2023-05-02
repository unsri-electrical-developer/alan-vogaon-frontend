import axios from "axios";

import { API, setAuthToken } from "../../config/API";
import localStorageService from "./localStorageService";

class apiAuthService {
  loginWithEmailAndPassword = (email, password) => {
    const params = { email, password };
    return API.post("/login", params).then((response) => {
      this.setSession(response.data.data.token);
      this.setUser(response.data.data);
      return response.data.data;
    });
  };

  loginWithToken = (token) => {
    setAuthToken(token);
    return API.get("admin/check/token").then((response) => {
      this.setSession(token);
      this.setUser(response.data.data);
      return response.data.data;
    });
  };

  getUserDetail = (token) => {
    setAuthToken(token);
    return API.get("admin/profile").then((response) => {
      this.setSession(token);
      this.setUser(response.data.data);
      return response.data.data;
    });
  };

  logout = (token) => {
    setAuthToken(token);
    return API.post("admin/logout")
      .then((response) => {
        this.setSession(null);
        this.removeUser();
        return response.data.data;
      })
      .catch((err) => {
        return Promise.reject(err);
      });
  };

  // Set token to all http request header, so you don't need to attach everytime
  setSession = (token) => {
    if (token) {
      localStorage.setItem("jwt_token", token);
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    } else {
      localStorage.removeItem("jwt_token");
      delete axios.defaults.headers.common["Authorization"];
    }
  };

  checkFitur = (parent, code) => {
    let res = false;
    let allFitur = localStorage.getItem("fitur");
    if (allFitur) {
      allFitur = JSON.parse(allFitur);
      let cek = allFitur?.filter((item) => item.fitur_type === parent);
      if (cek.length > 0) {
        let fitur = cek[0]?.fitur_detail?.some(
          ({ fitur_code, selected }) =>
            code?.some((val) => val === fitur_code) && selected === true
        );
        res = fitur;
      }
    }
    return res || false;
  };

  // Save user to localstorage
  setUser = (user) => {
    localStorageService.setItem("auth_user", user);
  };
  // Remove user from localstorage
  removeUser = () => {
    localStorage.removeItem("auth_user");
  };
  // Remove token from localstorage
  removeToken = () => {
    localStorage.removeItem("jwt_token");
  };
}

export default new apiAuthService();