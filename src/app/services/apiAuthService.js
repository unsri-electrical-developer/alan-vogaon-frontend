import axios from 'axios';

import { API, setAuthToken } from '../../config/API';
import localStorageService from './localStorageService';

class apiAuthService {
  loginWithEmailAndPassword = (email, password, token) => {
    const params = { email, password, token };
    return API.post('/login', params).then((response) => {
      const data = response.data.data;
      this.setSession(data.access_token);
      this.setUser(data);
      return data;
    });
  };

  loginWithToken = (token) => {
    setAuthToken(token);
    return API.post('check/token').then((response) => {
      this.setSession(token);
      this.setUser(response.data.data);
      return response.data.data;
    });
  };

  getUserDetail = (token) => {
    setAuthToken(token);
    return API.get('admin/profile').then((response) => {
      this.setSession(token);
      const ss = localStorage.getItem('ss')
      this.setUser(response.data.data, ss);
      return response.data.data;
    });
  };

  logout = (token) => {
    setAuthToken(token);
    return API.post('logout')
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
      localStorage.setItem('jwt_token', token);
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    } else {
      localStorage.removeItem('jwt_token');
      delete axios.defaults.headers.common['Authorization'];
    }
  };

  checkFitur = (parent, code) => {
    let res = false;
    let allFitur = localStorage.getItem('fitur');
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
  setUser = (user, ss = false) => {
    const ss_set = localStorage.getItem('ss')
    user.ss = ss
    if (ss_set == 'true') {
      // ss = true;
      user.ss = true;
    }
    // localStorageService.setItem('ss', ss);
    localStorageService.setItem('auth_user', user);
  };
  // Remove user from localstorage
  removeUser = () => {
    localStorage.removeItem('auth_user');
  };
  // Remove token from localstorage
  removeToken = () => {
    localStorage.removeItem('jwt_token');
  };
}

export default new apiAuthService();
