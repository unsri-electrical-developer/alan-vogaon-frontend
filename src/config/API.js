import axios from 'axios';

// Set config defaults when creating the instance
export const URL_API = process.env.REACT_APP_API_URL;
// export const URL_API = "https://wrwb.alanschool.id/";
// export const URL_API = 'http://127.0.0.1:8000/';

export const API = axios.create({
  baseURL: `${URL_API}api/v1/`,
});

export const setAuthToken = (token) => {
  API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  API.defaults.headers.common['Content-Type'] =
    'application/x-www-form-urlencoded';
  API.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
};

export const generateParams = ({ limit, hal, cari }) => {
  let params = '';
  if (limit) params += `limit=${limit}&`;
  if (hal) params += `page=${hal}&`;
  if (cari) params += `search=${cari}&`;
  return params.slice(0, params.length - 1);
};
